const web3 = require('./../../../core/web3').web3;
const meta = require('./../../../core/web3').meta;
const { Poll } = require('../models/poll.model');
const { hanldeError } = require('../services/error-handler.service');
const { signSendTransaction } = require('../services/web3.service');

async function createPollCall(req, res){
    try{
        console.log('Create poll', req.body)
        let title = req.body.title;
        let description = req.body.description;
        let creationDate = new Date().getTime();
        let imageURL = (req.body.imageURL) ? req.body.imageURL : '';
        let question = req.body.question;
        let answers = JSON.parse(req.body.answers);
        let params = [title, description, creationDate, imageURL, question, answers];
        console.log('Wallet ',req.wallet);
        let account = req.wallet;
        let hash = await signSendTransaction(account, 'PollContract', meta.PollContract.methods.createPoll, params);
        res.status(200).send({hash, message: 'Call ok'});
    }catch(error){
        let [statusCode, message] = hanldeError(error);
        return res.status(statusCode).send({message});
    }
}

async function getAllPollsCall(req, res){
    try{
        let data = await meta.PollContract.methods.getAllPolls().call();
        let polls = new Array();
        data.forEach(poll => {
            let parsedPoll = new Poll(poll);
            if(parsedPoll.created){ polls.push(parsedPoll); }
        });
        res.status(200).send(polls);
    }catch(error){
        let [statusCode, message] = hanldeError(error);
        return res.status(statusCode).send({message});
    }
}

async function answerPollCall(req, res){
    try{
        let id = req.body.id;
        let optionSelected = req.body.optionSelected;
        let params = [id, optionSelected];
        console.log('Wallet ',req.wallet);
        let account = req.wallet;
        let hash = await signSendTransaction(account, 'PollContract', meta.PollContract.methods.answerPoll, params);
        res.status(200).send({hash, message: 'Call ok'});
    }catch(error){
        let [statusCode, message] = hanldeError(error);
        return res.status(statusCode).send({message});
    }
}

async function getPollResultsCall(req, res){
    try{
        let id = req.query.id;
        let poll = await meta.PollContract.methods.getPollById(id).call();
        let parsedPoll = new Poll(poll);
        parsedPoll.results = (await meta.PollContract.methods.getPollResults(id).call()).results;
        console.log('getPollResults', parsedPoll);
        res.status(200).send({parsedPoll, message: 'Call ok'});
    }catch(error){
        let [statusCode, message] = hanldeError(error);
        return res.status(statusCode).send({message});
    }
}

async function getPollByIdCall(req, res){
    try{
        let id = req.query.id;
        let data = await meta.PollContract.methods.getPollById(id).call();
        let parsedPoll = new Poll(data);
        console.log('getPollById', parsedPoll);
        res.status(200).send(parsedPoll);
    }catch(error){
        let [statusCode, message] = hanldeError(error);
        return res.status(statusCode).send({message});
    }
}

async function getTotalPollsCall(req, res){
    try{
        let data = JSON.parse(await meta.PollContract.methods.getTotalPolls().call());
        console.log('getTotalPolls', data);
        res.status(200).send({data, message: 'Call ok'});
    }catch(error){
        let [statusCode, message] = hanldeError(error);
        return res.status(statusCode).send({message});
    }
}

async function deletePoll(req, res){
    try{
        let id = parseInt(req.query.id);
        let account = req.wallet;
        let params = [id];
        let hash = await signSendTransaction(account, 'PollContract', meta.PollContract.methods.deletePoll, params);
        res.status(200).send({hash, message: 'Call ok'});
    }catch(error){
        let [statusCode, message] = hanldeError(error);
        return res.status(statusCode).send({message});
    }
}

module.exports = {
    createPollCall,
    getAllPollsCall,
    answerPollCall,
    getPollResultsCall,
    getPollByIdCall,
    getTotalPollsCall,
    deletePoll,
}