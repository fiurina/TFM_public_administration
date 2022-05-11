const web3 = require('./../../../core/web3').web3;
const meta = require('./../../../core/web3').meta;
const { hanldeError } = require('../services/error-handler.service');
const { signSendTransaction } = require('../services/web3.service');

async function getContractBalance(req, res){
    try{
        let balance = await meta.SocialContract.methods.getContractBalance().call();
        res.status(200).send(balance);
    }catch(error){
        let [statusCode, message] = hanldeError(error);
        return res.status(statusCode).send({message});
    }
}

async function addTokensToContract(req, res) {
    try{
        let tokens = req.body.tokens;
        let params = [];
        let account = req.wallet;
        let hash = await signSendTransaction(account, 'SocialContract', meta.SocialContract.methods.transferFunds, params, tokens);
        res.status(200).send({hash, message: 'Call ok'});
    }catch(error){
        let [statusCode, message] = hanldeError(error);
        return res.status(statusCode).send({message});
    }
}

module.exports = {
    getContractBalance,
    addTokensToContract,
}