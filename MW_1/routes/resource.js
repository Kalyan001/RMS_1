var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var validator = require('validator');
var mysql = require('mysql');
const rateLimit = require("express-rate-limit");
var config = require('../config/config')
var db = config.db



router.get('/list', function (req, res) {

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
            console.log("Connected to resource");
        });

        let sql = `select resource from resource`
        console.log(sql);
        con.query(sql, function (err, result) {
            if (err) throw err;
            res.status(200).send({ result: result })
        });




    } catch (error) {
        res.status(500).send({ response: "Internal Error" })
    }
});
//export this router to use in our index.js
module.exports = router;