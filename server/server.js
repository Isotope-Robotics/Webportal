import express, { response } from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import jwt, { verify } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';

const app = express();
const salt = 10;
app.use(express.json());
app.use(cookieParser('jwtSecretKey'));

app.use(cors({
    origin: true,
    methods:['GET', 'POST'],
    credentials: true,
}));


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "convergence",
    database: "convergence-web"
})



app.get("/", function (req, res, next) {
    var token = req.signedCookies;
    token = token['Authorization'];
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

app.get('/api/auth/logout', function (req, res) {
    res.clearCookie('Authorization');
    return res.json({ Status: "Success" });
})

app.post('/api/auth/login', function (req, res) {
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [req.body.email], (err, data) => {
        if (err) return res.json({ Error: "Finding User in Server" });
        if (data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if (err) return res.json({ Error: "Password Compare Error" });
                if (response) {
                    const name = data[0].name;
                    const token = jwt.sign({ name }, 'key', { expiresIn: "3600s" });
                    res.cookie("Authorization", token, { httpOnly: true,signed: true, maxAge: 24000 });
                    return res.json({ Status: "Success" });
                } else {
                    return res.json({ Error: "Password Not Matched In Server" });
                }
            });
        } else {
            return res.json({ Error: "No Email In Server" });
        }
    })
})

app.listen(8081, () => {
    console.log("API Server Running on port: 8081")
})