const bcrypt = require('bcrypt');
const schemaSignUp = require('../../models/signup');
const jwt = require('jsonwebtoken');
const { keyJwt } = require('../../config.json');

async function signin(req, res) {
    if(!req.body.email){
        res.status(400).send({message:"Write your email"});
    } else if(!req.body.password){
        res.status(400).send({message:"Write your password"});
    } else {
        try{
            const user = await schemaSignUp.findOne({ email:req.body.email });
            if(!user){
                res.status(400).send({message:"Invalid email"});
                return;
            }
            const checkPassword = await bcrypt.compare(req.body.password, user.password);
            if(checkPassword){
                const token = await jwt.sign({ name:user.name, email:user.email, password:user.password }, keyJwt);
                res.send({message:"Success", token:token});
            } else {
                res.status(400).send({message:"Invalid password"});
            }
        } catch(e){
            res.status(500).send({message:"Server error..."});
        }
    };    
};

module.exports = { signin };