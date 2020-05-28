var express = require('express');
var bodyParser = require('body-parser')
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(8888, function() {
    console.log('app listening on port 8888');
});