var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    port = process.env.PORT || 3000,
    server = app.listen(port),
    superagent = require('superagent');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/static'));

app.get('/', function (req, res) {
    res.send(__dirname + '/static/index.html');
});

function isValidToken(payload) {
    var token = process.env.TOKEN;
    return payload.token === token;
}

function isApprovedUser(payload) {
    var approvedUsers = ['ross', 'itsmerossw', 'libby', 'moose'];
    return approvedUsers.indexOf(payload.user_name) !== -1;
}

function isValidChannel(payload) {
    return payload.channel !== 'privategroup' && payload.channel !== 'directmessage';
}

function postMinistryMessage(payload, callback) {
    var message = {
            username: 'Ministry of Food and Drink',
            icon_url: 'http://ministry-poster.herokuapp.com/ministry_logo.jpg',
            channel: '#' + payload.channel_name,
            text: payload.text
        },
        webhook = process.env.WEBHOOK;
    superagent.post(webhook, message, function (err, res) {
        if (err) {
            return callback(err);
        }
        if (res.status !== 200) {
            console.log('Returned non 200 status code', res.text);
            return callback('Received' + res.status + ' response');
        }
        callback();
    })
}

app.post('/', function (req, res) {
    var payload = req.body;

    if (isValidToken(payload)) {
        if (isApprovedUser(payload)) {
            if (isValidChannel(payload)) {
                postMinistryMessage(payload, function (err) {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.status(200).send('You are an approved Ministry member. :disaproval:');;
                    }
                });
            } else {
                res.send('Sorry - can\'t post in a private group or direct message.');
            }
        } else {
            res.send('Sorry - you are not an approved Ministry member. :disaproval:');
        }
    }
});