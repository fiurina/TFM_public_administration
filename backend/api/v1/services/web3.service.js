const web3 = require('./../../../core/web3').web3;
const Web3Core = require('./../../../core/web3');

async function signSendTransaction(address, contract, contractFunction, params, value){
    return new Promise(async (resolve, reject)=>{
        try{
            let tx_function = contractFunction(...params);
            const tx = {
                from: address, 
                to: Web3Core.contractAddress[contract], 
                gas: await tx_function.estimateGas({from: address}) + 100000, 
                value: (value) ? value : null,
                data: tx_function.encodeABI(),
                nonce: await web3.eth.getTransactionCount(address),
                chainId: await web3.eth.getChainId(),
            };
            console.log('Transaction: ',tx)
            let privateKey = obtainPrivateKey(address);
            const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
            const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
            resolve(receipt.transactionHash);
        }catch(error){ reject(error); }
    })
}

function obtainPrivateKey(address) {
    return Web3Core.provider.wallets[address.toLowerCase()].privateKey.toString("hex");
}

module.exports = {
    signSendTransaction,
    obtainPrivateKey,
}

