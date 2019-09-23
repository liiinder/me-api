const express = require('express');
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/texts.sqlite");
const dotenv = require('dotenv');

dotenv.config();

router.post("/",
    (req, res, next) => checkToken(req, res, next),
    (req, res) => addReport(res, req.body));

function checkToken(req, res, next) {
    const token = req.headers['x-access-token'];
    const jwt = require('jsonwebtoken');
    let data = {
        data: {
            msg: ""
        }
    };

    console.log(`TOKEN //// ${token}`);
    console.log("REQ:" + req.body.report);

    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (err) {
            // send error response
            data.data.msg = "Invalid Token";
            res.status(401).json(data)
        } else {
            // Valid token send on the request
            console.log("Valid token");
            next();
        }
    });
}

function addReport(res, req) {
    let data = {
        data: {
            msg: "vad kan ha gått fel?"
        }
    }

    console.log(JSON.stringify(req));
    db.run("UPDATE reports SET text = ? WHERE week like ?", req.report, req.week, (err) => {
        if (err) {
            res.status(400).json(data);
        } else {
            data.data.msg = "Ändringen är sparad"
            res.status(201).json(data);
        }
    });
}

router.get('/week/:week', function (req, res) {
    let data = {
        data: {
            msg: "Loaded kmom",
            report: {}
        }
    };

    db.all("SELECT * FROM reports WHERE week = ? LIMIT 1", req.params.week, function (err, row) {
        if (err) {
            data.data.msg = "Kmom failed to load";
            res.status(400).json(data);
        } else {
            // console.log(`ROW test: ${JSON.stringify(row[0])}`);

            data.data.report = row[0];
            res.status(200).json(data);
        };
    });
});

module.exports = router;
