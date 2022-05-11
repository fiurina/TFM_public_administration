const web3 = require('./../../../core/web3').web3;
const meta = require('./../../../core/web3').meta;
const { AdminUser } = require('../models/admin-user.model');
const { CitizenUser } = require('../models/citizen-user.model');
const { hanldeError, AuthenticationError } = require('../services/error-handler.service');
const { signSendTransaction, obtainPrivateKey } = require('../services/web3.service');
const { encryptData, decryptData } = require('../utils/crypto.util');
const { generateTokenJWT } = require('../utils/jwt.util');
const { asyncForEach } = require('./../utils/javascript.util');

async function getAccountsLocal(req, res){
    try{
        let accounts = await getAccounts();
        res.status(200).send(accounts);
    }catch(error){
        let [statusCode, message] = hanldeError(error);
        return res.status(statusCode).send({message});
    }
}

async function getAccounts(){
    return new Promise(async (resolve, reject)=>{
        try{
            let accountsBalance = [];
            const accounts = await web3.eth.getAccounts();
            await asyncForEach((accounts), async(a, index) =>{
                const balance = await web3.eth.getBalance(a);
                let name = 'Cuenta Local '+ (parseInt(index)+1);
                accountsBalance.push({account: a, balance, name});
            });
            resolve(accountsBalance);
        }catch(error){reject(error);}
    })
}

function authenticate(wallet){
    return new Promise(async (resolve, reject) =>{
        try{
            let authenticatedUser;
            let user = await meta.UserContract.methods.getClientUser(wallet).call();
            if(user[3]){ 
                user = new CitizenUser(user, obtainPrivateKey(wallet));
                authenticatedUser = user; 
            }
            else{
                let admin = await meta.UserContract.methods.getAdminUser(wallet).call();
                if(admin[3]){
                    admin = new AdminUser(admin, obtainPrivateKey(wallet));
                    authenticatedUser = admin; 
                }
            } 
            if(authenticatedUser) {
                let token = generateTokenJWT({wallet, roles: mapUserRoles(authenticatedUser.role)}, '2h');  
                resolve([token, authenticatedUser]);     
            }
            throw new AuthenticationError('Authentication Error', 'Error de autenticación');
        }catch(error){ reject(error); }
    });
}

async function authenticateUser(req, res){
    try{
        let selectedAccount = req.body.account;
        let [token, user] = await authenticate(selectedAccount);

        return res.status(200).send({token, user});
    }catch(error){
        let [statusCode, message] = hanldeError(error);
        return res.status(statusCode).send({message});
    }
}

function mapUserRoles(role){
    let roles = new Array();
    switch(role){
        case 0:
            roles.push('CITIZEN');
            break;
        case 1: 
            roles.push('ADMIN');
            break;
    }
    return roles;
}

async function registerAdminUserCall(req, res){
    try{
        let account = req.body.account;
        let name = encryptData(req.body.name, obtainPrivateKey(account));
        let surname = encryptData(req.body.surname, obtainPrivateKey(account));
        let dni = encryptData(req.body.dni, obtainPrivateKey(account));
        let params = [name, surname, dni];
        let hash = await signSendTransaction(account, 'UserContract', meta.UserContract.methods.registerAdminUser, params);
        res.status(200).send({hash, message: 'Call ok'});
    }catch(error){
        console.log('Err', error)
        let [statusCode, message] = hanldeError(error);
        return res.status(statusCode).send({message});
    }
}

async function registerUserCall(req, res){
    try{
        let account = req.body.account;
        let name = encryptData(req.body.name, obtainPrivateKey(account));
        let surname = encryptData(req.body.surname, obtainPrivateKey(account));
        let dni = encryptData(req.body.dni, obtainPrivateKey(account));
        let gender = req.body.gender;
        let salary = req.body.salary;
        let age = parseInt(req.body.age);
        let params = [name, surname, dni, gender, salary, age];
        console.log('Register user', params);
        let hash = await signSendTransaction(account, 'UserContract', meta.UserContract.methods.registerUser, params);
        res.status(200).send({hash, message: 'Call ok'});
    }catch(error){
        console.log('Err', error)
        let [statusCode, message] = hanldeError(error);
        return res.status(statusCode).send({message});
    }
}

async function getTotalUsersCall(req, res){
    try{
        let data = JSON.parse(await meta.UserContract.methods.getTotalUsers().call());
        res.status(200).send(data);
    }catch(error){
        let [statusCode, message] = hanldeError(error);
        return res.status(statusCode).send({message});
    }
}

async function getTotalAdminUsersCall(req, res){
    try{
        let data = JSON.parse(await meta.UserContract.methods.getTotalAdminUsers().call());
        res.status(200).send(data);
    }catch(error){
        let [statusCode, message] = hanldeError(error);
        return res.status(statusCode).send({message});
    }
}

async function deleteAdminUserCall(req, res){
    try{
        let account = req.wallet;
        let hash = await signSendTransaction(account, 'UserContract', meta.UserContract.methods.deleteAdminUser, []);
        res.status(200).send({hash, message: 'Call ok'});
    }catch(error){
        let [statusCode, message] = hanldeError(error);
        return res.status(statusCode).send({message});
    }
}

async function deleteUserCall(req, res){
    try{
        let account = req.wallet;
        let hash = await signSendTransaction(account, 'UserContract', meta.UserContract.methods.deleteClientUser, []);
        res.status(200).send({hash, message: 'Call ok'});
    }catch(error){
        let [statusCode, message] = hanldeError(error);
        return res.status(statusCode).send({message});
    }
}

async function logoutUser(req, res){
    try{
        let account = req.wallet;
        res.status(200).send();
    }catch(error){
        let [statusCode, message] = hanldeError(error);
        return res.status(statusCode).send({message});
    }
}

module.exports = {
    getAccountsLocal,
    authenticate,
    authenticateUser,
    registerAdminUserCall,
    registerUserCall,
    getTotalAdminUsersCall,
    getTotalUsersCall,
    deleteAdminUserCall,
    deleteUserCall,
    logoutUser,
}