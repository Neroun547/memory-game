const storageUserModel = require('../../models/storageUsers');
const signUpModel = require('../../models/signup');
const storageUsers = require('../../models/storageUsers');
const { client } = require('../../config.json');

async function confirmEmail(req, res){
    try{
        const storageUser = await storageUserModel.findOne({tokenEmail: req.params['token']});
        if(!storageUser){
            res.status(404).send({message:"Account not found ..."});
        } else { 
            const checkUser = await signUpModel.findOne({email:storageUsers.email});
            if(checkUser){
                res.status(400).send({message:"Error email "});
            } else {
                const user = new signUpModel({
                    name:storageUser.name,
                    email:storageUser.email,
                    password:storageUser.password,
                    records:[]
                });

                await user.save();
                await storageUser.remove({ tokenEmail:req.params['token'] });
                res.redirect(client + '/signin');
            }
        }
    } catch(e){
        console.log(e);
        res.status(500).send({message:"Server error"})
    }
};

module.exports = { confirmEmail };