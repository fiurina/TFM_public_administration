const web3 = require('./../../../core/web3').web3;
const meta = require('./../../../core/web3').meta;
const { SocialAid } = require('../models/social-aid.model');
const { hanldeError } = require('../services/error-handler.service');
const { signSendTransaction } = require('../services/web3.service');

async function createSocialAid(req, res){
    try{
        let title = req.body.title;
        let description = req.body.description;
        let creationDate = new Date().getTime();
        let tokens = parseInt(req.body.tokens);
        let imageURL = req.body.imageURL;
        let conditionType = parseInt(req.body.conditionType);
        let minRange = parseInt(req.body.minRange);
        let maxRange = parseInt(req.body.maxRange);
        let param = req.body.param;

        let params = [title, description, creationDate, tokens, imageURL, conditionType, minRange, maxRange, param];
        console.log('Create socialAid', params);
        let account = req.wallet;
        let hash = await signSendTransaction(account, 'SocialContract', meta.SocialContract.methods.createSocialAid, params);
        res.status(200).send({hash, message: 'Call ok'});
    }catch(error){
        console.log(error)
        let [statusCode, message] = hanldeError(error);
        return res.status(statusCode).send({message});
    }
}

async function getAllSocialAidsCall(req, res){
    try{
        let data = await meta.SocialContract.methods.getAllSocialAids().call();
        let socialAids = new Array();
        data.forEach(social => {
            let parsedSocial = new SocialAid(social);
            if(parsedSocial.created){ socialAids.push(parsedSocial); }
        });
        res.status(200).send(socialAids);
    }catch(error){
        let [statusCode, message] = hanldeError(error);
        return res.status(statusCode).send({message});
    }
}

async function checkSocialAidCall(req, res){
    try{
        let id = req.body.id;
        let params = [id];
        console.log('Wallet ',req.wallet);
        let account = req.wallet;
        let hash = await signSendTransaction(account, 'SocialContract', meta.SocialContract.methods.checkSocialAid, params);
        res.status(200).send({hash, message: 'Call ok'});
    }catch(error){
        let [statusCode, message] = hanldeError(error);
        return res.status(statusCode).send({message});
    }
}

async function recieveSocialAidCall(req, res){
    try{
        let id = req.body.id;
        let params = [id];
        console.log('Wallet ',req.wallet);
        let account = req.wallet;
        let hash = await signSendTransaction(account, 'SocialContract', meta.SocialContract.methods.recieveSocialAid, params);
        res.status(200).send({hash, message: 'Call ok'});
    }catch(error){
        let [statusCode, message] = hanldeError(error);
        return res.status(statusCode).send({message});
    }
}

async function getSocialAidByIdCall(req, res){
    try{
        let id = req.query.id;
        let data = await meta.SocialContract.methods.getSocialAidById(id).call();
        let parsed = new SocialAid(data);
        console.log('getSocialAidById', parsed);
        res.status(200).send(parsed);
    }catch(error){
        let [statusCode, message] = hanldeError(error);
        return res.status(statusCode).send({message});
    }
}

async function getTotalSocialAidsCall(req, res){
    try{
        let data = JSON.parse(await meta.SocialContract.methods.getTotalSocialAids().call());
        console.log('getTotalSocialAids', data);
        res.status(200).send({data, message: 'Call ok'});
    }catch(error){
        let [statusCode, message] = hanldeError(error);
        return res.status(statusCode).send({message});
    }
}

async function deleteSocial(req, res){
    try{
        let id = parseInt(req.query.id);
        let account = req.wallet;
        let params = [id];
        let hash = await signSendTransaction(account, 'SocialContract', meta.SocialContract.methods.deleteSocial, params);
        res.status(200).send({hash, message: 'Call ok'});
    }catch(error){
        let [statusCode, message] = hanldeError(error);
        return res.status(statusCode).send({message});
    }
}

module.exports = {
    createSocialAid,
    getAllSocialAidsCall,
    checkSocialAidCall,
    recieveSocialAidCall,
    getSocialAidByIdCall,
    getTotalSocialAidsCall,
    deleteSocial,
}