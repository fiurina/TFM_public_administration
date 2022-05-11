const { hanldeError } = require('../services/error-handler.service');
const ipfsService = require('../services/ipfs.service');
const fs = require('fs');

async function uploadIPFS(req, res){
    try{
        let image = req.file;
        await ipfsService.connectIPFS();
        let imageURL = await ipfsService.uploadToIPFS(image.buffer);
        console.log('ImageURL', imageURL)
        res.status(200).send({imageURL});
    }catch(error){
        console.log(error)
        let [statusCode, message] = hanldeError(error);
        return res.status(statusCode).send({message});
    }

}

module.exports = {
    uploadIPFS,
}