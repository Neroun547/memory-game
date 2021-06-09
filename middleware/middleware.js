const path = require('path');
const router = require('../router/router');
const express = require('express');
const app = express();
//Cokie
app.use(express.json());
//Proxy 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.urlencoded({extended:false}));

app.use(express.static(path.resolve('./public')));

app.use(router);

module.exports = app;