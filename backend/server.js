
const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const morgan = require('morgan');
const winston = require('./core/winston');
const cors = require('cors');
const path = require('path');
const { initData } = require('./data/init');

if (config.env !== 'production') { process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'; }

const app = express();
app.use(bodyParser.urlencoded({extended: true, limit: '50mb', parameterLimit:1000000}));
app.use(bodyParser.json({extended: true, limit: '50mb'}));
let server;

app.on('ready', function () {
  const https = require('https');
  const fs = require('fs');

  let serverHttps_options = {
    key: fs.readFileSync(path.join(__dirname, './'+config.ssl_key_dir+'/privateKey.key')),
    cert: fs.readFileSync(path.join(__dirname, './'+config.ssl_key_dir+'/certificate.crt')),
    secureOptions: require('constants').SSL_OP_NO_TLSv1,
  };

  server = https.createServer(serverHttps_options, app).listen(config.port);
  server.timeout = 10000;

  console.log('RESTful API started on port ' + config.port + ' in ' + config.env);
});

//MORGAN LOGS
morgan.token('reqCORSHeader', (req, res) => {
  return 'ACAO: ' + req.get('Access-Control-Allow-Origin') + 'ACAC: ' + req.get('Access-Control-Allow-Credentials') + 'ACEH: ' + req.get('Access-Control-Expose-Headers');
});
morgan.token('resCORSHeader', (req, res) => {
  return 'ACAO: ' + res.get('Access-Control-Allow-Origin') + 'ACAC: ' + res.get('Access-Control-Allow-Credentials') + 'ACEH: ' + res.get('Access-Control-Expose-Headers');
});

app.use(morgan(':remote-addr :url :method HTTP/:http-version :user-agent', {
  immediate: true,
  stream: winston.stream
}));

app.use(morgan(':remote-addr :url :method :status :res[content-length] :response-time ms', {
  stream: winston.stream
}));

// CORS
const corsOptionsDelegate = function (req, cb) {
  let corsOptions = { credentials: true };
  corsOptions.origin = true;
  cb(null, corsOptions);
};
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cors(corsOptionsDelegate));


 try {
  const Web3Core = require('./core/web3');
  Web3Core.loadContracts().then(() => {
      console.log('Connected to Ganache on port 8545');
      app.emit('db_ready');
  });
} catch (error) {
  console.error('Error connecting to Ganache on port 8545', error);
  process.exit(1);
}

app.on('db_ready', async function () {

  // PASSPORT
  require('./core/passport')(passport);
  app.use(passport.initialize());

  // ROUTES
  let v1 = express.Router();
  require('./api/v1/routes')(v1, passport);
  app.use('/v1', v1);
  app.use('/', v1);
  app.use(function (req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'});
  });

  app.emit('ready');
});

app.on('ready', async function () {
  await initData();
});

module.exports = app;
