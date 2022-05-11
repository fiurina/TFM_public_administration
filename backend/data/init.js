const { get, post } = require('../api/v1/services/api.service');

/*
 * Function called to initialize some data for development test
 */
async function initData(){
    return new Promise(async (resolve, reject) => { 
        try{
            let accounts = await get('localhost', 5050, '/api/wallets');

            //ADMIN
            let login = await post('localhost', 5050, '/api/authenticate-user', {account: accounts[0].account});
            let body;
            if(!login.token){
                body = {name:'Admin', surname:'surname', dni: 'dni', account: accounts[0].account};
                await post('localhost', 5050, '/api/users/admin', body);
            }

            let polls = await get('localhost', 5050, '/api/polls');
            if(polls && polls.length<=0){
                body = {title: 'Encuesta muy interesante', description:'Lorem ipsum description', imageURL:'',question:'question2?', answers: '["yes","no","it depends"]'};
                await post('localhost', 5050, '/api/poll', body, login.token);
                body = {title: 'Encuesta muy interesante 2', description:'Lorem ipsum description', imageURL:'',question:'question2?', answers: '["yes","no","it depends"]'};
                await post('localhost', 5050, '/api/poll', body, login.token);
            }
            let socials = await get('localhost', 5050, '/api/socials');
            if(socials && socials.length<=0){
                body = {title: 'Ayuda social', description:'Lorem ipsum description', tokens: '10000000000000', imageURL:'',
                conditionType: '0', minRange: '0', maxRange: '0', param: 'F'};
                await post('localhost', 5050, '/api/social', body, login.token);
                body = {title: 'Ayuda social 2', description:'Lorem ipsum description', tokens: '20000000000000', imageURL:'',
                conditionType: '1', minRange: '0', maxRange: '0', param: '10'};
                await post('localhost', 5050, '/api/social', body, login.token);
                body = {title: 'Ayuda social 3', description:'Lorem ipsum description', tokens: '30000000000000', imageURL:'',
                conditionType: '2', minRange: '20', maxRange: '30', param: ''};
                await post('localhost', 5050, '/api/social', body, login.token);
            }

            //USER
            login = await post('localhost', 5050, '/api/authenticate-user', {account: accounts[1].account});
            if(!login.token){
                body = {name:'User', surname:'surname', dni: 'dni', gender: 'F', salary: '10', age: 20, account: accounts[1].account};
                await post('localhost', 5050, '/api/users/user', body);
            }
            resolve();
        } catch(error){ reject(error); }
    });
}

module.exports = {
    initData,
}