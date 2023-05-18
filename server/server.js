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
    var token = req.signedCookies;
    token = token['Authorization'];
    let name;

    try {
        const verified = jwt.verify(token, 'key');
        console.log(`Is User Verified: ${verified.name}`);
        name = verified.name;
        
        return res.json({Status: "Success", user: name});
        session=req.session;
        session=req.session;
        session.userid=req.body.username;
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
                    res.cookie("Authorization", token, { httpOnly: true,signed: true, maxAge: 24000 });
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


//Starts the API Server
app.listen(8081, () => {
    console.log("API Server Running on port: 8081")
})