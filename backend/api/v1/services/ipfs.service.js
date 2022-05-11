const { create } = require('ipfs-http-client');
var BASE58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const config = require('./../../../config');
var bs58 = require('base-x')(BASE58)

const ipfs_url = config.ipfs;
var ipfsNode;

async function connectIPFS(){
    return new Promise(async (resolve, reject) =>{
        try {
            console.log('Connectin IPFS to ', ipfs_url);
            ipfsNode = await create(ipfs_url);
            resolve()
        } catch(error){ reject(error); }
    });
}

async function uploadToIPFS(file) {
    return new Promise(async (resolve, reject)=>{
        try{
            const results = await ipfsNode.add(file);
            resolve(results);
        }catch(err){ reject(err); }
    });
}

async function getFileIPFS(image_url){
    const stream = ipfsNode.cat(image_url);
    let data = '';
    for await (const chunk of stream) { data += chunk }
    resolve(ipfs_url+image);
}

module.exports = {
    connectIPFS,
    uploadToIPFS, 
    getFileIPFS,
}

