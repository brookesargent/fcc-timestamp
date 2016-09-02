// grab the packages we need
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var moment = require('moment');

// routes will go here
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