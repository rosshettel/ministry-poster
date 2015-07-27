var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    port = process.env.PORT || 3000,
    server = app.listen(port);

app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + '/static'));

app.get('/', function (req, res) {
    res.send(__dirname + '/static/index.html');
});

function isValidToken (payload) {
    var token = process.env.TOKEN;
    return payload.token === token;
}

function isApprovedUser (payload) {
    var approvedUsers = ['ross', 'itsmerossw', 'libby', 'moose'];
    return approvedUsers.indexOf(payload.user_name) !== -1;
}

app.post('/', function (req, res) {
    var payload = req.body;

    if (isValidToken(payload)) {
        if (isApprovedUser(payload)) {
            res.send('You are an approved Ministry member.');
        } else {
            res.send('Sorry - you are not an approved Ministry member.');
        }
    }
    //get webhook
    //check if user_name is on approved list
        //if not, respond with message to user
        //if so, send empty 200 response
            //then send message to webhook, formatted as ministry
});