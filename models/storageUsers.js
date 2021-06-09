const { model, Schema } = require('mongoose');

const storageUser = new Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    tokenEmail:{
        type:String
    },
    createdAt: { type: Date, expires: '3m', default: Date.now }
});

module.exports = model('storageUsers', storageUser, 'storageUsers');