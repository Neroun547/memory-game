const jwt = require('jsonwebtoken');
const { keyJwt } = require('../../config.json');

async function user(req, res) {
    try{
        const user = await jwt.verify(req.body.token, keyJwt);
        
        res.send({
            name:user.name,
            email:user.email
        });
    } catch(e){
        res.sendStatus(400);
    }
};

module.exports = { user };