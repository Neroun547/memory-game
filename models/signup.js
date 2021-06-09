const { model, Schema } = require('mongoose');

const signUp = new Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    records:{
        type:Array
    }
});

module.exports = model('users', signUp, 'users');