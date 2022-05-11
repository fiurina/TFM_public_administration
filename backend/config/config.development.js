/*
 * Development configuration
 */
const config = require('./config.global');

config.env = 'development';
config.version = '1.0.0';

config.base_enpoint = '/api'

config.generatorJWT = '571fddf78277ba4e13b46489399aeea82866e0769728ce1d77cb1c0c5e73b6373176ce4e03bd3ea542ef9d9e5958abee23b7f912984168de31e198bab204a3fe';

config.ipfs = 'http://localhost:5001';
config.ganache = 'ws://localhost:8545';
config.ganache_secret = "second supreme disorder tunnel pizza candy lamp elbow special attend accuse agent";

module.exports = config;