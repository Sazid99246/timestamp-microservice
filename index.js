// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// get date and its details
app.get('/api/:date', (req, res) => {
  let date;
  if(isNaN(Number(req.params.date))){
    date = req.params.date;
  } else{
    date = new Date(parseInt(req.params.date))
  }
  const utcValue = date.toUTCString();
  const unixValue = date.getTime();
  res.json({
    unix: unixValue,
    utc: utcValue
  })
})

// get current date
app.get('/api', (req, res) => {
  const date = new Date();
  const timeStampinMs = date.getTime();
  const utc = date.toUTCString();
  res.json({
    unix: timeStampinMs,
    utc: utc
  })
})

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 5000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
