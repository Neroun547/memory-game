const jwt = require('jsonwebtoken');
const { keyJwt } = require('../config.json');

async function checkToken(req, res){
    try {
        const dataUser = await jwt.verify(req.body.token, keyJwt);
        res.sendStatus(200);
        return dataUser;
    } catch(e){
        res.status(400).send({message:"Error token"});
    }
};

module.exports = { checkToken };