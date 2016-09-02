//user stories:
    //-can pass a string as a parameter, and it will check
    // to see whether that string contains a unix timestamp OR a natural
    // language date
    
    //-if it does, it returns both the unix timestamp and the natural 
    // language form of the date
    
    //-if it does not contain a date or unix timestamp, it returns
    // null for those properties
    
// grab the packages we need
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var bodyParser = require('body-parser');
var moment = require('moment');

// routes will go here
//use /:timestamp as the parameter when ready
app.get('/:timestamp', function(req, res) {
  var date = req.params.timestamp;
  var naturalDate;
  var unixDate;
  if (isNaN(+date))
  {
    naturalDate = moment(date).format('MMMM Do, YYYY');
    unixDate = moment(date).format('X');
  }
  
  else if (!isNaN(+date))
  {
    unixDate = +date;
    naturalDate = moment.unix(unixDate).format('MMMM Do, YYYY');
  }
  
  else
  {
    unixDate = null;
    naturalDate = null;
  }
  
  var dateObj = { "unix": unixDate, "natural": naturalDate };
  res.send(dateObj);
});

// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);