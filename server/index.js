const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const { MongoClient } = require('mongodb');
const keys = require('./auth_keys.json');

const app = express();

app.get('/myServer/twitterLogin/requestToken', (req, res) => {
    console.log('requesting token')
    const url = 'https://api.twitter.com/oauth/request_token';
    const oauth = {
            consumer_key: keys.tw_key,
            consumer_secret: keys.tw_secret
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

app.get('/myServer/twitterLogin/accessToken', (req, res) => {
    console.log('access token',req.query);
    const token = new URLSearchParams(req.query).get('oauth_token');
    const verifier = new URLSearchParams(req.query).get('oauth_verifier');
    const url = 'https://api.twitter.com/oauth/access_token';
    const oauth = {
        consumer_key: keys.tw_key,
        consumer_secret: keys.tw_secret,
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

app.post('/myServer/signUp',bodyParser.json(), async (req,res) => {
    console.log('signup body',req.url, req.query, req.body);
    const body = req.body;
    if(body) {
        const { userName, email, password } = body;
        const url = `mongodb+srv://${keys.mongo_userId}:${keys.mongo_pwd}@cluster0.gw3ak.mongodb.net`;
        const client = new MongoClient(url);
        await client.connect();
        const users = await client.db('Jira').collection('Users');
        console.log('DB Connected');
        const existsUser = await users.findOne({ email });
        if(existsUser) {
            console.log('exists user', existsUser);
            res.status(422).send({ fieldName: 'email'});
        } else {
            console.log('inserting record');
            users.insertOne({
                _id: userName,
                email,
                password    
            }).then((response) => {
                if(response.result.ok) {
                res.status(200).send({ msg: "success"});
                } else {
                    res.status(503).send();
                } 
                
            }).catch(e => {
                res.status(422).send({ fieldName: 'userName'});
            });
        }
    }

});

app.listen(3000, () => {
    console.log('running on port 3000');
});