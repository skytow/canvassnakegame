var path = require('path');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 9021));

app.use(express.static(__dirname));

app.get('*', function(request, response) {
    response.send('In progress...');
});

app.listen(app.get('port'), function() {
    console.log("Application is running at localhost:" + app.get('port'));
});