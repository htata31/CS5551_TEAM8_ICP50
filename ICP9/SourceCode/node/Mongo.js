/**
 * Created by user on 23/10/2016.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require("body-parser");
var express = require('express');
var cors = require('cors');
var app = express();
var url = 'mongodb://htata31:tata1994@ds135993.mlab.com:35993/htata';
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/register', function (req, res) {
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        var db= client.db('htata');
        insertDocument(db, req.body, function() {
            res.write("Successfully inserted");
            res.end();
        });

    });
})

app.get('/getData', function (req, res) {
    var searchKeywords = req.query.searchkey;
    console.log("Param are "+searchKeywords);
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        if (err) throw err;
        var db = client.db("htata");
        var query = { major: searchKeywords };
        db.collection("demoase").find(query).toArray(function(err, result) {
            if (err) throw err;
            client.close();
            res.json(result);
        });
    });
});

var insertDocument = function(db, data, callback) {
    db.collection('demoase').insertOne( data, function(err, result) {
        if(err)
        {
            res.write("Registration Failed, Error While Registering");
            res.end();
        }
        console.log("Inserted a document into the asedemo collection.");
        callback();
    });
};

var server = app.listen(8081,function () {
    var host = server.address().address
    console.log("host value"+host);
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})