/**
 * Main driver for application configuration
 * The file depended on the environment is automatically included (development, production)
 */
const env = process.env.NODE_ENV || 'development';
const config = require('./config.' + env);

module.exports = config;