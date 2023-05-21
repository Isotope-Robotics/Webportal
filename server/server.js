import express, { response } from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import jwt, { verify } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import request  from "request";

const app = express();
const salt = 10;
app.use(express.json());
app.use(cookieParser('jwtSecretKey'));

app.use(cors({
    origin: ["http://localhost:3000", "http://convergence-scouting.cloud", "https://convergence-scouting.cloud"],
    credentials: true,
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,

    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}))

app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "convergence",
    database: "convergence-web"
})

var tbaId = "jINO6qdzc4xGIZKGxGl6FzY1PzOT29IuOrm0jHoWH21ZHWS6OOjYXhOjl2PI8i2Y";
var baseURL = "https://www.thebluealliance.com/api/v3";


//Returns a list of teams loaded from the DB
app.get("/api/teams/list", function(req, res){
    db.query('SELECT * FROM teams', function (err, result){
        if (err){
            console.error(err);
        } else {
            res.json({Status: "Success", teams: result});
        }
    })
})

//Returns if the user is authorized
app.get("/api/token", function (req, res, next) {
    //let token = req.signedCookies;
    //token = token['Authorization'];

    let token = req.session.token;

    let name;

    try {
        const verified = jwt.verify(token, 'key');
        console.log(`Is User Verified: ${verified.name}`);
        name = verified.name;

        return res.json({Status: "Success", user: name});
    } catch(err) {
        console.log(err);
        console.log(`Is User Verified: False`);
        return res.json({Status: "Fail "})
    }
})

//Registers new users into the API
app.post('/api/auth/register', function (req, res) {
    const sql = "INSERT INTO users (`name`, `email`, `password`, `signInCode`) VALUES (?)";
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if (err) return res.json({ Error: "Error for Hashing Password" });

        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.signInCode
        ]

        db.query(sql, [values], (err, result) => {
            if (err) return res.json({ Error: "Inserting data error in to Server" });
            return res.json({ Status: "Success" });
        })
    })

})

//Handles logout function of the API
app.get('/api/auth/logout', function (req, res) {
    req.session.destroy();
    res.clearCookie('Authorization');
    return res.json({ Status: "Success" });
})

//Handles login form form the API
app.post('/api/auth/login', function (req, res) {
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [req.body.email], (err, data) => {
        if (err) return res.json({ Error: "Finding User in Server" });
        if (data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if (err) return res.json({ Error: "Password Compare Error" });
                if (response) {
                    const name = data[0].name;
                    const token = jwt.sign({ name }, 'key', { expiresIn: "1d" });
                    //res.cookie("Authorization", token, { httpOnly: true,signed: true, maxAge: 24000 });
                    req.session.token = token;
                    return res.json({ Status: "Success" , token});
                } else {
                    return res.json({ Error: "Password Not Matched In Server" });
                }
            });
        } else {
            return res.json({ Error: "No Email In Server" });
        }
    })
})

//Returns event lists for a set year
app.get('/api/find/events', function(req, res){
    const year = req.params.id;
    const sql = "SELECT * FROM events";
    db.query(sql, (err, data) => {
        if (err) return res.json({Error: "Cannot Find Events In Database From That Year"});
        if (data){
            return res.json({Status: "Success", data});
        }
    })

})

//Adds a new event to the database after pulling info from TBA
app.post('/api/events/add', function(req, res){
    const event_key = req.body.event_key;
    return res.json({Status: "Success"});
})

app.post('/api/event/set:id', function(req, res){
    const event_id = req.params.id;
    return res.json({Status: "Success", event_id});
})

//Retrieves TBA info for specified event and loads it into the database (Teams Lists)
app.get('/api/tba/get/event:id', function(req, res){
    const event_id = req.params.id;

})

//Starts the API Server
app.listen(8081, () => {
    console.log("API Server Running on port: 8081")
})


//Pulls teams and puts them in database
function getTeamsByEvent(eventKey) {
    url = baseURL + '/event/' + eventKey + '/teams';
  
    request.get({ url: url, headers: { "X-TBA-Auth-Key": tbaId } }, function (error, response, body) {
      if (error) {
        console.log("Error getting team info from TBA");
      } else {
        //Parse returned body to JSON object
        data = JSON.parse(body);
  
        //loop through JSON object to get each team number
        for (team of data) {
          insertTeam(`${team.team_number}`, `${team.nickname}`, `${team.rookie_year}`, eventKey);
          console.log("Inserted teams into Database");
        };
  
      }
  
    });
}

//Inserts teams into EventTeams Database
function insertTeam(team, nickname, rookie_year, eventKey){
    team_sql = `INSERT INTO ${eventKey}(Number, Nickname, Rookie) VALUES (?,?,?)`;
    conn.query(team_sql, [team, nickname, rookie_year], function(err){
        if (err){
            console.error(err);
        } else{
            console.log("Inserted team info");
        }
    });
}
