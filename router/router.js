const express = require('express');
const app = express();
const { signup } = require('../actions/signup/signup');
const { signin } = require('../actions/signin/signin');
const { confirmEmail } = require('../actions/confirm-email/confirmEmail');
const { checkToken } = require('../service/checkToken');
const { user } = require('../actions/user/user');
const { addRecord } = require('../actions/add-record/addRecord');
const { getRecord } = require('../actions/get-record/getRecord');
/* POST route */

app.post('/', (req, res) => {
    checkToken(req, res);
});

app.post('/add-record', (req, res) => {
    addRecord(req, res);
});

app.post('/signup', (req, res) => {
    signup(req, res);
});

app.post('/signin', (req, res) => {
    signin(req, res);
});

app.post('/user', (req, res) => {
    user(req, res);
});

app.post('/get-records', (req, res) => {
    getRecord(req, res);
});

/* GET route */

app.get('/confirm-email/:token', (req, res) => {
    confirmEmail(req, res);
});

module.exports = app;

