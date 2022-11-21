const express = require('express');
const dotnenv = require('dotenv');
const app = express();
const db = require('./db/db');

dotnenv.config();

const PORT = process.env.PORT || 2500;

app.use(express.json());

app.get('/', async(req, res) => {
    res.send({message: 'This is the fintech team 11'});
});

app.listen(PORT, (err) => {
    console.log(`App up and running on ${PORT}`);
});