import express, { response } from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import jwt, { verify } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import request from "request";
import 'dotenv/config'

const app = express();
const salt = 10;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser('jwtSecretKey'));

app.use(cors({
    origin: ["http://localhost:3000", "http://convergence-scouting.cloud", "https://convergence-scouting.cloud"],
    credentials: true,
}));

app.use(function (req, res, next) {
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
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
})

var tbaId = "jINO6qdzc4xGIZKGxGl6FzY1PzOT29IuOrm0jHoWH21ZHWS6OOjYXhOjl2PI8i2Y";
var baseURL = "https://www.thebluealliance.com/api/v3";


//Returns a list of teams loaded from the DB
app.get("/api/teams/list", function (req, res) {
    db.query('SELECT * FROM teams', function (err, result) {
        if (err) {
            console.error(err);
        } else {
            res.json({ Status: "Success", teams: result });
        }
    })
})

//Returns if the user is authorized
app.get("/api/token", function (req, res, next) {
    let token = req.session.token;
    let name;

    try {
        const verified = jwt.verify(token, process.env.PASS_KEY);
        console.log(`Is User Verified: ${verified.name}`);
        name = verified.name;
        let isAdmin = verified.isAdmin;
        console.log(`is Users: ${isAdmin}`);

        //Add admin handling code for event publishing and user registration

        return res.json({ Status: "Success", user: name, admin: isAdmin });
    } catch (err) {
        console.log(err);
        console.log(`Is User Verified: False`);
        return res.json({ Status: "Fail " })
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
            req.body.signInCode,
        ]

        db.query(sql, [values], (err, result) => {
            if (err) return res.json({ Error: "Inserting data error in to Server" });
            return res.json({ Status: "Success" });
        })
    })

})

app.get('/api/auth/users', function (req, res) {
    const sql = `SELECT * FROM users`;
    db.query(sql, (err, data) => {
        if (err) return res.json({ Status: "Error" });
        if (data.length > 0) {
            return res.json({ Status: "Success", users: data });
        }
    })
})

app.post('/api/auth/editUser', function (req, res) {
    const sql = `UPDATE users SET signInCode="${req.body.permission}" WHERE name="${req.body.student}" `
    
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            return res.json({Status: "Error"});
        }else {
            return res.json({Status: "Success"});
        }
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
                    const isAdmin = checkIsAdmin(data[0].signInCode);
                    const token = jwt.sign({ name, isAdmin }, process.env.PASS_KEY, { expiresIn: "1d" });
                    req.session.token = token;
                    return res.json({ Status: "Success", token });
                } else {
                    return res.json({ Error: "Password Not Matched In Server" });
                }
            });
        } else {
            return res.json({ Error: "No Email In Server" });
        }
    })
})

//Returns event lists in DB
app.get('/api/find/events/all', function (req, res) {
    const sql = "SELECT * FROM events";
    db.query(sql, (err, data) => {
        if (err) return res.json({ Error: "Cannot Find Events In Database From That Year" });
        if (data) {
            return res.json({ results: data });
        }
    })

})

app.post('/api/event/teams', function (req, res) {
    const event_name = req.headers.event_code;
    var code = "";
    const sql = 'SELECT * FROM events WHERE name=?';
    db.query(sql, [event_name], (err, result) => {
        if (err) return console.log(err);
        else {
            code = result[0].event_code;
            const team_sql = `SELECT * FROM ${code}`;
            db.query(team_sql, (err, data) => {
                if (err) return console.log(err);
                else {
                    console.log(data);
                    return res.json({ results: data });

                }
            })
        }
    })
})


app.post('/api/event/scouting/pit', function (req, res) {
    const event_name = req.headers.event_code;
    var name = "";
    const sql = 'SELECT * FROM events WHERE name=?';
    db.query(sql, [event_name], (err, result) => {
        if (err) return console.log(err);
        else {
            name = result[0].name;
            var new_name = removeSpaces(name);
            var currentYear = new Date().getFullYear();
            const pitInfo = `SELECT * FROM ${currentYear}${new_name}`;
            db.query(pitInfo, (err, result) => {
                if (err) return res.json({ Status: "Error" });
                else {
                    return res.json({ Status: "Success", data: result })
                }
            })
        }
    })
})

app.post('/api/event/scouting/match', function (req, res) {
    const event_name = req.headers.event_code;
    var name = "";
    const sql = 'SELECT * FROM events WHERE name=?';
    db.query(sql, [event_name], (err, result) => {
        if (err) return console.log(err);
        else {
            name = result[0].name;
            var new_name = removeSpaces(name);
            var currentYear = new Date().getFullYear();
            const matchInfo = `SELECT * FROM ${currentYear}${new_name}match`;
            db.query(matchInfo, (err, result) => {
                if (err) return res.json({ Status: "Error" });
                else {
                    return res.json({ Status: "Success", data: result })
                }
            })
        }
    })
})


app.get('/api/event/:code', function (req, res) {
    const event_key = req.params.event_code;
    return req.json({ Status: "Success", key: event_key });
})

//Adds a new event to the database after pulling info from TBA
app.post('/api/events/add', function (req, res) {
    const event_key = req.body.event_code;
    const currentYear = new Date().getFullYear();
    const checkSQL = `SELECT * FROM ${currentYear}${event_key}`;
    const event_string = `${currentYear}` + `${event_key}`;
    //Checks if Event is Already There
    db.query(checkSQL, (err, result) => {
        if (err) {
            const sql = `CREATE TABLE ${event_string} (teamNumber int, nickname varchar(255))`;
            db.query(sql, (err, data) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`Created Table For Event: ${event_key}`);
                    getTeamsByEvent(event_key, currentYear);
                    getEventName(event_string);
                    return res.json({ Status: "Success" });
                }
            })
        } else {
            return res.json({ Status: "Already Created" });
        }
    })
})

//Handles post request for pit submitions, auto increments per year(2023Blacksburg, 2024Blacksburg)
app.post('/api/event/pit/submit', function (req, res) {
    const currentYear = new Date().getFullYear();
    const event_code = req.headers.event_code;
    const sql_event = `${currentYear}` + `${event_code}`;
    const new_event = removeSpaces(sql_event);

    const sql = `INSERT INTO ${new_event} (Number,
        Weight,
        Height,
        Length,
        Width,
        Drivetrain,
        Drivetrain_Motors,
        FreeSpeed,
        Element_Pickup,
        Element_Scoring,
        Hang_Charge,
        Start_Position,
        Auto_Balance) VALUES (?)`;

    const values = [
        req.body.number,
        req.body.weight,
        req.body.height,
        req.body.length,
        req.body.width,
        req.body.driveTrain,
        req.body.motors,
        req.body.freeSpeed,
        req.body.elementPickup,
        req.body.elementScoring,
        req.body.hangChargestation,
        req.body.startPosition,
        req.body.autoBalance
    ]

    db.query(sql, [values], (err, result) => {
        if (err) {

            //Create the table
            var table_sql = `CREATE TABLE ${new_event} (Number varchar(255),
                Weight varchar(255),
                Height varchar(255),
                Length varchar(255),
                Width varchar(255),
                Drivetrain varchar(255),
                Drivetrain_Motors varchar(255),
                FreeSpeed varchar(255),
                Element_Pickup varchar(255),
                Element_Scoring varchar(255),
                Hang_Charge varchar(255),
                Start_Position varchar(255),
                Auto_Balance varchar(255))`;

            db.query(table_sql, (err, result) => {
                if (err) return res.json({ Error: err });
                else {
                    //Submit the values again after table creation
                    db.query(sql, [values]);
                    return res.json({ Status: "Success" });
                }
            })
        } else {
            return res.json({ Status: "Success" });
        }

    })
})

//Handles post request for match submitions, auto increments per year(2023Blacksburg_match, 2024Blacksburg_match)
app.post('/api/event/match/submit', function (req, res) {
    const currentYear = new Date().getFullYear();
    const event_code = req.headers.event_code;
    const sql_event = `${currentYear}` + `${event_code}`;
    const new_event = removeSpaces(sql_event);

    const sql = `INSERT INTO ${new_event}match (
        TeamNumber,
        MatchNum,
        Placement,
        Mobility,
        AutoBalance,
        ConeHigh,
        ConeLow,
        CubeScore,
        AutoScore,
        TeleConeHigh,
        TeleConeLow,
        TeleCube,
        TeleScore,
        TeleBalance
    ) VALUES (?)`;

    const values = [
        req.body.teamNumber,
        req.body.matchNumber,
        req.body.placement,
        req.body.mobility,
        req.body.autoBalance,
        req.body.coneHigh,
        req.body.coneLow,
        req.body.cubeScore,
        req.body.autoScore,
        req.body.teleConeHigh,
        req.body.teleConeLow,
        req.body.teleCube,
        req.body.teleScore,
        req.body.teleBalance
    ]

    db.query(sql, [values], (err, result) => {
        if (err) {
            const table_sql = `CREATE TABLE ${new_event}match (
                TeamNumber varchar(255),
                MatchNum varchar(255),
                Placement varchar(255),
                Mobility varchar(255),
                AutoBalance varchar(255),
                ConeHigh varchar(255),
                ConeLow varchar(255),
                CubeScore varchar(255),
                AutoScore varchar(255),
                TeleConeHigh varchar(255),
                TeleConeLow varchar(255),
                TeleCube varchar(255),
                TeleScore varchar(255),
                TeleBalance varchar(255)
                )`;
            db.query(table_sql, [values], (err, result) => {
                if (err) return res.json({ Status: err });
                else {
                    //Submit the values again after table creation
                    db.query(sql, [values]);
                    return res.json({ Status: "Success" });
                }
            })
        } else {
            return res.json({ Status: "Success" });
        }
    })

})

//Keep-Alive Function for SQL Connections
function pingdb() {
    var sql_keep = `SELECT 1 + 1 AS solution`;
    db.query(sql_keep, function (err, result) {
        if (err) throw err;
        console.log("Ping DB");
    });
}
setInterval(pingdb, 3600000);

//404 GET
app.get("*", function (req, res) {
    return res.json({ Status: "404 Resource Not Found" })
})

//404 POST
app.post("*", function (req, res) {
    return res.json({ Status: "404 Resource Not Found" })
})

//Starts the API Server
app.listen(8081, () => {
    console.log("API Server Running on port: 8081")
})


//Pulls teams and puts them in database
function getTeamsByEvent(eventKey, year) {
    const url = baseURL + '/event/' + year + eventKey + '/teams';
    var data;
    var team;

    request.get({ url: url, headers: { "X-TBA-Auth-Key": tbaId } }, function (error, response, body) {
        if (error) {
            console.log("Error getting team info from TBA");
        } else {
            //Parse returned body to JSON object
            data = JSON.parse(body);

            //loop through JSON object to get each team number
            for (team of data) {
                insertTeam(`${team.team_number}`, `${team.nickname}`, eventKey, year);
                console.log("Inserted teams into Database");
            };


        }

    });
}

//Inserts teams into EventTeams Database
function insertTeam(team, nickname, eventKey, year) {
    const event_string = `${year}` + `${eventKey}`;
    var team_sql = `INSERT INTO ${event_string}(teamNumber, nickname) VALUES (?,?)`;
    db.query(team_sql, [team, nickname], function (err) {
        if (err) {
            console.error(err);
        } else {
            console.log("Inserted team info");
        }
    });
}

function getEventName(event_code) {
    const url = baseURL + '/event/' + event_code;
    var data;
    var events;

    request.get({ url: url, headers: { "X-TBA-Auth-Key": tbaId } }, function (error, response, body) {
        if (error) {
            console.log("Error getting event info from TBA");
        } else {
            //Parse returned body to JSON object
            data = JSON.parse(body);
            //console.log(data.key);
            insertEvent(data.city, data.key);
            //console.log("Inserted event into Database");



        }

    });
}

function insertEvent(city, key) {
    const sql = `INSERT INTO events (name, event_code) VALUES (?,?)`;
    db.query(sql, [`${city}`, `${key}`], function (err) {
        if (err) {
            console.error(err);
        } else {
            console.log("Inserted Event");
        }
    })
}

function removeSpaces(spacesString) {
    var removedSpaces = spacesString.split(" ").join("");
    return removedSpaces;
}

function checkIsAdmin(signInCode) {
    const currentYear = new Date().getFullYear();
    let isAdmin = "false";
    if (signInCode == "student") {
        isAdmin = "false";
    } else if (signInCode == "admin") {
        isAdmin = "true";
    } else {
        isAdmin = "false";
    }

    return isAdmin;
}