// server.js
// where your node app starts

// init project
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  //console.log('Your app is listening on port ' + listener.address().port);
});

// timestamp
app.get('/api/timestamp', function(req, res) {
  var now = new Date();
    res.json({
      'unix': now.getTime(),
      'utc': now.toUTCString()
    });
})


app.get('/api/timestamp/:date_string', function(req, res) {
  var startTime = new Date().toLocaleString();
  console.group(startTime);
  console.log('Initiating request...');
  console.log('Requested date_string: ' + req.params.date_string);
  var requestedDate = new Date(req.params.date_string);
  if (requestedDate != 'Invalid Date') {
    res.json({
      'unix': requestedDate.getTime(),
      'utc': requestedDate.toUTCString()
    });
  } else {
    requestedDate = new Date(req.params.date_string/1000).toUTCString();
    if (requestedDate != 'Invalid Date') {
      res.json({
        'unix': req.params.date_string,
        'utc': requestedDate
      });
    } else {
        res.json({'error': 'Invalid Date'});
    }
  }
  console.log('Result: ' + res);
  console.groupEnd(startTime);
});