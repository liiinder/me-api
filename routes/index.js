const db = require("../db/database.js");

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const dotenv = require('dotenv');

dotenv.config();

router.get('/', function (req, res) {
    const data = {
        data: {
            name: "Kristoffer Linder",
            city: "Falköping",
            desc: `Brinner för discgolf, kitesurf, snowboard, resa och till och från fastnar jag med min rubiks kub (GAN 356 X stickerless).
            Mitt single pb ligger på 8.72s (Fivetimer blandningen: R' D2 L' D2 B2 F2 R B' D2 U B L' D2 B U2 L' B U') och mitt bästa average of 5 ligger på en låg 12 sekunder.`
        }
    };
    
    res.status(200).json(data);
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

    bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
        if (err) {
            data.data.msg = "Error in the password hash";
            res.status(400).json(data);
        } else {
            db.run("INSERT INTO users VALUES (?, ?, ?, ?)", email, hash, birth, name, (err) => {
                if (err) {
                    data.data.msg = "This email is already registered";
                    // console.log("This email is already registered");
                    res.status(400).json(data);
                } else {
                    status = 201;
                    res.status(status).json(data);
                }
            });
        }
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
    };

    db.all("SELECT password FROM users WHERE email = ? LIMIT 1", payload.email, function (err, row) {
        if ((err) || (row[0] === undefined)) {
            data.data.msg = "Invalid email";
            res.status(400).json(data);
        } else {
            bcrypt.compare(req.body.password, row[0].password, function (err, bcryptRes) {
                if ((err) || (!bcryptRes)) {
                    data.data.msg = "Invalid password";
                    res.status(400).json(data); 
                } else {
                    data.data.token = jwt.sign(payload, secret, { expiresIn: '1h' });
                    res.status(200).json(data);
                };
            });
        };
    });
});

module.exports = router;