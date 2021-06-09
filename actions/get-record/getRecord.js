const singUpSchema = require('../../models/signup');
const jwt = require('jsonwebtoken');
const { keyJwt } = require('../../config.json');

async function getRecord(req, res) {
    try {   
        const userJwt = await jwt.verify(req.body.token, keyJwt);
        const user = await singUpSchema.findOne({email:userJwt.email});
        res.send({data:user.records});
    } catch(e){
        res.sendStatus(500);
    }
}

module.exports = { getRecord };