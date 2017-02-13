// Main starting point of application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

// DB setup
mongoose.connect('mongodb://localhost/journies');


app.use(express.static('public'));

// App setup
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: 2000000, extended: false }));
router(app);

// Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
