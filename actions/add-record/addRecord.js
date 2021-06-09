const schemaSignUp = require('../../models/signup');
const { keyJwt } = require('../../config.json');
const { formatDate } = require('../../service/formateDate');  
const jwt = require('jsonwebtoken');

async function addRecord(req, res){
    const recordToken = req.body.token;
    const saveDate = {
        lvl:req.body.lvl.lvl,
        date:formatDate(new Date()),
        record:req.body.lvl.record,
    }
    try{
        const userJwt = await jwt.verify(recordToken, keyJwt);
        const saveUser = await schemaSignUp.findOne({email:userJwt.email});

        const verifyLvl = saveUser.records.findIndex(el => el.lvl === saveDate.lvl);
        
        if(verifyLvl >= 0){
            saveUser.records.splice(verifyLvl, 1);
            saveUser.records.push(saveDate);
            saveUser.save();
            res.sendStatus(200);
        } else {
            saveUser.records.push(saveDate);
            saveUser.save();
        }
    } catch(e){
        res.sendStatus(400);
    }
};

module.exports = { addRecord };