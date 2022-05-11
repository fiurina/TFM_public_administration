module.exports = function (app, passport) {
    const Ipfs = require('./../controllers/ipfs.controller');
    const config = require('./../../../config');
    const multer = require('multer');
    const path = require('path');

    var storage = multer.memoryStorage();
    var upload = multer({storage});
    
    app.route(config.base_enpoint+'/upload-ipfs')
    .post(passport.authenticateJwt, upload.single('file'), (req, res) =>{
        Ipfs.uploadIPFS(req, res);
    })  
};