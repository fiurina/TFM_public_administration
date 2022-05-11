const jwt = require('jsonwebtoken');
const config = require('../../../config');

function generateTokenJWT(tokenData, expirationIn){
    return jwt.sign({tokenData}, config.generatorJWT, {expiresIn: expirationIn});
}

function verifyToken(token){
    try{
        return jwt.verify(token, config.generatorJWT);
    }catch(err){return undefined;}
}

module.exports = {
    generateTokenJWT,
    verifyToken,
}