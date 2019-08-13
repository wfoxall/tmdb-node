require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const request = require('request');
const tmdb = require('./tmdb');

app.get('/', (req, res) => {
    if (req.query.title) {
        tmdb.getRatingByTitle(req.query.title).then(result => {
            res.send(result);
        }, rejected => {
            res.send(`Error: ${JSON.stringify(rejected)}`);
        })
    }else{
        res.send("Supply a movie or tv show title as query parameter 'title' to receive rating");
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});