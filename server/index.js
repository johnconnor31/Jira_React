const express = require('express');
const request = require('request');
const keys = require('../src/static/twitter_keys.json');

const app = express();
app.get('/twitterLogin/requestToken', (req, res) => {
    console.log('requesting token')
    const url = 'https://api.twitter.com/oauth/request_token';
    const oauth = {
            consumer_key: keys.key,
            consumer_secret: keys.secret
        };
    request.post({ url, oauth }, (err, resp, body) =>{
        console.log('request token resp', body);
        if(!err && resp.statusCode===200) {
        res.send(body);
        } else {
            res.status(401).send(body);
        }
    });
    
});

app.get('/twitterLogin/accessToken', (req, res) => {
    console.log('access token',req.query);
    const token = new URLSearchParams(req.query).get('oauth_token');
    const verifier = new URLSearchParams(req.query).get('oauth_verifier');
    const url = 'https://api.twitter.com/oauth/access_token';
    const oauth = {
        consumer_key: keys.key,
        consumer_secret: keys.secret,
        token,
        verifier
    }
    request.post({ url, oauth }, (err, resp, body) =>{
        console.log('request token resp', body);
        if(!err && resp.statusCode===200) {
        res.send(body);
        } else {
            res.status(401).send(body);
        }
    });
    
});

app.listen(3000, () => {
    console.log('running on port 3000');
});