const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/texts.sqlite");

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

router.get('/', function (req, res) {
    const data = {
        data: {
            name: "Kristoffer Linder",
            city: "Falköping",
            desc: `Brinner för discgolf, kitesurf, snowboard, resa och till och från fastnar jag med min rubiks kub (GAN 356 X stickerless).
            Mitt single pb ligger på 8.72s (Fivetimer blandningen: R' D2 L' D2 B2 F2 R B' D2 U B L' D2 B U2 L' B U') och mitt bästa average of 5 ligger på en låg 12 sekunder.`
        }
    };
    
    res.json(data);
});

router.post('/register', function (req, res) {
    const saltRounds = 10;
    const email = req.body.email;
    const myPlaintextPassword = req.body.password;
    const birth = req.body.birth ? req.body.birth : "";
    const name = req.body.name ? req.body.name : "";
    let data = {
        data: {
            msg: `Email registered successfully`
        }
    };
    let status = 201;

    bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
        if (err) {
            data.data.msg = "Error in the password hash";
            status = 400;
            res.status(status).json(data);
        }
        db.run("INSERT INTO users VALUES (?, ?, ?, ?)", email, hash, birth, name, (err) => {
            if (err) {
                data.data.msg = "This email is already registered";
                status = 400;
                res.status(status).json(data);
            } else {
                res.status(status).json(data);
            }
        });
    });

});

router.post('/login', function (req, res) {
    const jwt = require('jsonwebtoken');
    const secret = process.env.JWT_SECRET;
    const payload = { email: req.body.email };
    let data = {
        data: {
            msg: `Successfully logged in`
        }
    }
    let status = 200;

    console.log(`secret: ${secret}`);
    console.log(`payload: ${payload}`);
    db.each("SELECT password FROM users WHERE email = ?", payload.email, function (err, row) {
        console.log(`Row.password: ${row.password}`);
        if (err) {
            data.data.msg = "Invalid email";
            status = 400;
            res.status(status).json(data); 
        }
        bcrypt.compare(req.body.password, row.password, function (err, res) {
            console.log("RES login: " + res); // res innehåller nu true eller false beroende på om det är rätt lösenord.
            if (err) {
                data.data.msg = "Invalid password";
                status = 400;
                res.status(status).json(data); 
            }
            const token = jwt.sign(payload, secret, { expiresIn: '1h' });
            
            console.log(`token? ${token}`);
            res.status(status).json(data);
        });
    });
});

module.exports = router;