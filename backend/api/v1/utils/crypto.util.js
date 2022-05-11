const CryptoJS = require("crypto-js");

function encryptData(data, walletPrivateKey){
    var ciphertext = CryptoJS.AES.encrypt(data, walletPrivateKey).toString();
    return ciphertext;
}

function decryptData(ciphertext, walletPrivateKey){
    var bytes  = CryptoJS.AES.decrypt(ciphertext, walletPrivateKey);
    var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
}

function encryptDataObject(data, walletPrivateKey){
    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), walletPrivateKey).toString();
    return ciphertext;
}

function decryptDataObject(ciphertext, walletPrivateKey){
    var bytes  = CryptoJS.AES.decrypt(ciphertext, walletPrivateKey);
    // var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
}

module.exports = {
    encryptData,
    decryptData,
}