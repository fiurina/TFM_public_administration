const meta = require('./../../../core/web3').meta;
const web3 = require('./../../../core/web3').web3;
const { AdminUser } = require('../models/admin-user.model');
const { CitizenUser } = require('../models/citizen-user.model');
const { hanldeError } = require('../services/error-handler.service');
const { signSendTransaction, obtainPrivateKey } = require('../services/web3.service');
const { encryptData } = require('../utils/crypto.util');

async function getCitizenUser(req, res){
    try{
        let user = await meta.UserContract.methods.getClientUser(req.wallet).call();
        user = new CitizenUser(user, obtainPrivateKey(req.wallet));
        user.balance = await web3.eth.getBalance(req.wallet);    
        res.status(200).send(user);
    }catch(error){
        let [statusCode, message] = hanldeError(error);
        return res.status(statusCode).send({message});
    }
}

async function getAdminUser(req, res){
    try{
        let user = await meta.UserContract.methods.getAdminUser(req.wallet).call();
        console.log('User', user)
        user = new AdminUser(user, obtainPrivateKey(req.wallet));
        user.balance = await web3.eth.getBalance(req.wallet);    
        res.status(200).send(user);
    }catch(error){
        let [statusCode, message] = hanldeError(error);
        return res.status(statusCode).send({message});
    }
}

async function updateCitizenUser(req, res){
    try{
        let name = encryptData(req.body.name, obtainPrivateKey(req.wallet));
        let surname = encryptData(req.body.surname, obtainPrivateKey(req.wallet));
        let dni = encryptData(req.body.dni, obtainPrivateKey(req.wallet));
        let socialParams = JSON.parse(req.body.socialParams);
        let params = [name, surname, dni, socialParams.gender, socialParams.salary, socialParams.age];
        let hash = await signSendTransaction(req.wallet, 'UserContract', meta.UserContract.methods.editClientUser, params);
        res.status(200).send({hash, message: 'Call ok'});
    }catch(error){
        let [statusCode, message] = hanldeError(error);
        return res.status(statusCode).send({message});
    }
}

async function updateAdminUser(req, res){
    try{
        console.log('Admin user update', req.body);
        let name = encryptData(req.body.name, obtainPrivateKey(req.wallet));
        let surname = encryptData(req.body.surname, obtainPrivateKey(req.wallet));
        let dni = encryptData(req.body.dni, obtainPrivateKey(req.wallet));
        let params = [name, surname, dni];
        console.log('Params ',params)
        let hash = await signSendTransaction(req.wallet, 'UserContract', meta.UserContract.methods.editAdminUser, params);
        res.status(200).send({hash, message: 'Call ok'});
    }catch(error){
        let [statusCode, message] = hanldeError(error);
        return res.status(statusCode).send({message});
    }
}

module.exports = {
    getCitizenUser,
    getAdminUser,
    updateAdminUser,
    updateCitizenUser,
}