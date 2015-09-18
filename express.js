"use strict";
let PORT = 3000;
let express = require("express");
let fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
let exp = express();

exp.use(function(req,res,next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  next();
});

exp.use(bodyParser.urlencoded({ extended: false }));
exp.use(bodyParser.json());


exp.set('views' , path.join(__dirname, 'views'));
//exp.use('/', require('./index'));


exp.get('/tracked', function(req, res) {
  fs.readFile('tracked.json', function(err, dataBuffer) {
    var data = JSON.parse(dataBuffer);
    res.send(data);
  });
});

exp.post('/tracked', function (req, res, next) {
  fs.readFile('tracked.json', function(err, dataBuffer) {
    var data = JSON.parse(dataBuffer);
    console.log(req.body);
    data.tracked.push(req.body.newTicker);

    fs.writeFile('tracked.json', JSON.stringify(data), function(err) {
      res.send(data.tracked);
    })
  })
});

//exp.get('*', (req, res) => {
////  fs.readFile(__dirname + req.url, function (err, data) {
////    if (err) console.log(err);
////    res.writeHead("content-type", "text/html");
////    //res.send(data);
////    //console.log(data);
////  });
//});

exp.listen(PORT, function() {
  console.log("listen listen listen");
});
