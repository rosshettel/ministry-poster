var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    port = process.env.PORT || 3000,
    server = app.listen(port);

app.use(bodyParser.json());
app.use(express.static(__dirname + '/static'));

app.get('/', function (req, res) {
    res.send(__dirname + '/static/index.html');
});

app.post('/', function (req, res) {
    var payload = req.body;
    console.log(payload);
    //get webhook
    //check if user_name is on approved list
        //if not, respond with message to user
        //if so, send empty 200 response
            //then send message to webhook, formatted as ministry
});