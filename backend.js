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
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
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
    data.tracked[req.body.newTicker.Symbol] = (req.body.newTicker);

    fs.writeFile('tracked.json', JSON.stringify(data), function(err) {
      res.send(data.tracked);
    })
  })
});

exp.post('/delete', function(req, res, next) {
  fs.readFile('tracked.json', function(err, dataBuffer) {
    var data = JSON.parse(dataBuffer);
    console.log(req.body);
    delete data.tracked[req.body.tickerSymbol];

    fs.writeFile('tracked.json', JSON.stringify(data), function(err) {
      res.send(data.tracked);
    })
  })
});

exp.listen(PORT, function() {
  console.log("listen listen listen");
});
