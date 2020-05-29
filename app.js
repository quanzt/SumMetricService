var express = require('express');
var bodyParser = require('body-parser')

var app = express();
var port = 8888
var logging = {}

// parse application/json
app.use(bodyParser.json())

// POST /metric/key get empty JSON bodies
// metric logging the value for this key
app.post('/metric/:key', bodyParser.json(), function (req, res) {
    if (req.body.value) {
        var metricKey = req.params.key
        var metricValue = req.body.value
        var date = new Date();
        var timeStamp = date.toLocaleTimeString();
        var startTime = Math.round(date.getTime() / 1000); // seconds

        // check if it is a new metric key
        if(logging[metricKey] === undefined) {
            logging[metricKey] = []
        }

        // events logged service for metric key and time
        logging[metricKey].push({ metricValue: metricValue, metricTime: startTime });
        printLog(timeStamp, metricKey, metricValue);

        // Response(200) empty JSON bodies
        res.status(200).send("{}")
    } else {
        res.status(400).send({ "type": "error", "message": "Please input the value"})
    }
});

// GET /metric/key/sum get sum of all metrics for this key over the past hour JSON bodies
app.get('/metric/:key/sum', function (req, res) {
    var metricKey = req.params.key
    var date = new Date();
    var endTime = Math.round(date.getTime() / 1000); // seconds
    var timeLimit = endTime - 3600 // current time - 1 hour (in seconds)

    if (logging[metricKey] === undefined) {
        res.status(400).send({ "type": "error", "message": "Invalid key"})
    } else {
        logging[metricKey] = removeDataOverOneHour(timeLimit, logging[metricKey]);
        var total = getTotalSum(logging[metricKey]);

        // Response(200) sum total JSON bodies
        res.send({ "value": total});
    }

});

app.listen(port, function() {
    console.log('app listening on port ' + port);
});


// helper functions
function removeDataOverOneHour(timeLimit, metricKey) {
    while ((0 < metricKey.length) && (metricKey[0]['metricTime'] < timeLimit)) {
        metricKey.shift();
    }
    return metricKey
}

function getTotalSum(metricKey) {
    var total = 0;
    for(var index = 0; index < metricKey.length; index++) {
        total += metricKey[index].metricValue;              
    }
    return total
}

function printLog(timeStamp, metricKey, metricValue) {
    console.log("// " + timeStamp + " **")
    console.log("POST /metric/" + metricKey + " { \"value\" = " + metricValue + " }")
}