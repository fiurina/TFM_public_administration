
const config = {};
config.hostname = 'localhost';
config.port = process.env.PORT || 5050;
config.ssl_key_dir = '/certs'

module.exports = config;