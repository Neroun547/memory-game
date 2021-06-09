const { email, passwordEmail, port } = require('../../config.json');
const storageUserModel = require('../../models/storageUsers');
const signUpModel = require('../../models/signup');
const nodemailer = require('nodemailer');
const { generateHash } = require('../../service/generateHash');
const bcrypt = require('bcrypt');

async function signup(req, res) {
    console.log(req.body);
    if(!req.body.name){
        res.status(500).send({message:"Write your name"});
    } else if(!req.body.email){
        res.status(500).send({message:"Write your email"});
    } else if(!req.body.password){
        res.status(500).send({message:"Write your password"});
    } else {
        try{
            const findUser = await signUpModel.findOne({email:req.body.email.trim()});
            if(findUser){
                res.status(400).send({message:"User with this email already exists"})
            } else {
                const token = generateHash();

                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: email,
                        pass: passwordEmail
                    }
                });
                    await transporter.sendMail({
                        from: email,
                        to: req.body.email,
                        subject: 'Confirm email',
                        html: `
                            <h1>Hello, ${req.body.name}. Please verify your account.</h1>
                            <a href="http://localhost:${port}/confirm-email/${token}">Confirm</a>
                        `
                    });
                    const hash = await bcrypt.hash(req.body.password.trim(), 10);

                    const pendingUser = new storageUserModel({
                        name:req.body.name.trim(),
                        email:req.body.email.trim(),
                        password:hash,
                        tokenEmail:token
                    });
        
                    await pendingUser.save();
                    res.send({message:"List send your email"});
                }
        } catch(e){
            console.log(e);
            res.status(500).send({message:"Server error"});
        }
    }
}

module.exports = { signup };