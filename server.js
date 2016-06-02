var express = require('express');
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
var routes = require('./routes');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8099;

app.use('/', routes);
app.use(express.static(__dirname + "/views" ));

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);