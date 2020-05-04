var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var validator = require('validator');
var mysql = require('mysql');
const rateLimit = require("express-rate-limit");
var config = require('../config/config')
var db = config.db



router.post('/enquire_ph', function (req, res) {
    var con = mysql.createConnection({
        host: db.ip,
        user: db.id,
        password: db.pass,
        port: db.port,
        database: db.dbname
    });

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });
    let sql = `select * from user where phnum="${req.body.phnum}"`
    console.log(sql,req.body);
    
    // res.send('GET route on things.');
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.status(200).send({ result: result})
    });

});


const createLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 20, // start blocking after 5 requests
    message:
        "Too many requests created from this IP, please try again after an hour"
});
router.post('/create_req', createLimiter, async function (req, res) {

    console.log(req.body);
    // INSERT INTO user (phnum, request, location,status) VALUES ('1', '1', '1','1');
    var { phnum, request, lat, lng } = req.body
    try {
        var con = mysql.createConnection({
            host: db.ip,
            user: db.id,
            password: db.pass,
            port: db.port,
            database: db.dbname
        });

        con.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
        });
        if (validator.isMobilePhone(phnum) && validator.isLatLong(lat + "," + lng)) {
            let sql = `insert  into user (phnum,request,lat,lng,status) values (${req.body.phnum},'${req.body.request}',${req.body.lat},${req.body.lng},"open")`
            console.log(sql);
            con.query(sql, function (err, result) {
                if (err) throw err;
                res.status(200).send({ result: result, jobID: result.insertId })
            });
        } else {
            console.log(validator.isMobilePhone(phnum), validator.isNumeric(request), validator.isLatLong(lat + "," + lng));

            res.status(400).send({ response: "bad data" })

        }



    } catch (error) {
        res.status(500).send({ response: "Internal Error" })
    }
    // res.send("ok")



});


//export this router to use in our index.js
module.exports = router;