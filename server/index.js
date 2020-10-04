const express = require('express');
const request = require('request');
const keys = require('../src/static/twitter_keys.json');

const app = express();
app.get('/twitterLogin/requestToken', (req, res) => {
    console.log('requesting token')
    const url = 'https://api.twitter.com/oauth/request_token';
    const authHeader = `OAuth oauth_consumer_key=${keys.key},oauth_signature_method="HMAC-SHA1",oauth_timestamp="1601804262",oauth_nonce="BoufilS5VGW",oauth_signature="J7Cx7one1eqb70gNAY9fK%2Flsnnc%3D"`;
    const headers = {
        Authorization: authHeader
    }
    request.post({ url, headers }, (err, resp, body) =>{
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
    const oauth_token = new URLSearchParams(req.query).get('oauth_token');
    const oauth_verifier = new URLSearchParams(req.query).get('oauth_verifier');
    console.log('oauth params are', oauth_verifier);
    const url = 'https://api.twitter.com/oauth/access_token';
    const authHeader = `OAuth oauth_consumer_key=${keys.key},oauth_token=${oauth_token},oauth_signature_method="HMAC-SHA1",oauth_timestamp="1601811131",oauth_nonce="DEJq9RVA4Db",oauth_verifier=${oauth_verifier},oauth_signature="pNH3%2BXvsWsZ7I0AJnImOw7VOGKQ%3D`
    const headers = {
        Authorization: authHeader
    }
    request.post({ url, headers }, (err, resp, body) =>{
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