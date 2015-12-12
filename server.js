var http = require('http');
var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

var db;

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.use('/static', express.static(__dirname + '/bower_components'));
app.use('/static/public', express.static(__dirname + '/public'));

MongoClient.connect('mongodb://localhost:27017/rpg/', function (err, database) {
    if (!err) {
        console.log('Connected to database rpg.');
        db = database;
    } else {
        throw err;
    }
});

var server = app.listen(3000, function () {
    var port = server.address().port;
    console.log('MEAN RPG app listening at http://localhost:%s', port);
});
