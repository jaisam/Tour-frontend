

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
// const compression = require('compression');
// const helmet = require('helmet');
const {join} = require('path');

// const config = require('./vg-config');

const app = express();

// Logger for HTTP Requests
app.use(logger('dev'));

app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({extended: false, limit: '50mb'}));


// Enable gzip compression
// app.use(compression());

// Enable helmet middleware
// app.use(helmet());

// Disable x-powered-by header
app.disable('x-powered-by');

// Serve angular application
app.use(express.static(join(__dirname, 'dist')));
app.get('*', (req, res) => res.sendFile(join(__dirname, 'dist/index.html')));

app.listen(8080, () => {
  console.log(`Server listening on: ${8080}`); // eslint-disable-line no-console
});
