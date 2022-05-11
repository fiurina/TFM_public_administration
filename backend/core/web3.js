const Web3 = require('web3');
const fs = require('fs');
const path = require('path');
const HDWalletProvider = require("@truffle/hdwallet-provider");
const config = require('./../config');
const mnemonicPhrase = config.ganache_secret;

var meta, web3, provider;
var contractAddress;

const web3ProviderURL = config.ganache;

async function loadContracts(){
    return new Promise(async (resolve, reject)=>{
        try{
            web3 = new Web3(web3ProviderURL);
            const networkId = await web3.eth.net.getId();

            provider = new HDWalletProvider({
                mnemonic: mnemonicPhrase,
                providerOrUrl: web3ProviderURL,
                shareNonce: true,
                derivationPath: "m/44'/60'/0'/0/",
                pollingInterval: 8000,
                chainId: networkId
            });
            web3.setProvider(provider)

            const wallets = provider.wallets;
            var accounts = [];
            for (const wallet in wallets) {
                let account = wallets[wallet];
                accounts.push({
                    privateKey: account.privateKey.toString("hex"),
                    publicKey: account.publicKey.toString("hex"),
                    publicAddress: wallet,
                });
            }
            // console.log('All data from accounts ',accounts)

            let contractsDeploy = getContracts(networkId);
            meta = contractsDeploy.meta;
            contractAddress = contractsDeploy.contractAddress;
            module.exports = { web3, meta, contractAddress, provider }
            resolve();
        }catch(error){ reject(error); }
    })
}

function getContracts(networkId){
    let jsonFiles = ['PublicAdminContract', 'UserContract', 'PollContract', 'SocialContract'];
    let meta = {};
    let contractAddress = {};
    jsonFiles.forEach(file => {
        var artifact= JSON.parse(fs.readFileSync(path.resolve('./../truffle/build/contracts/'+file+'.json')));
        const deployedNetwork = artifact.networks[networkId];
        contractAddress[file] = deployedNetwork.address;
        meta[file] = new web3.eth.Contract(artifact.abi, contractAddress[file]);
    });
    return {meta, contractAddress};
}

module.exports = {
    loadContracts
}
