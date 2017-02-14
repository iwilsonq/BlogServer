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
console.log(process.env.MONGODB_URI);
console.log(process.env.CLOUDINARY_URL);
console.log(process.env.PORT);
console.log(process.env.JWT_SECRET);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/journies');


app.use(express.static('public'));

// App setup
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: 2000000, extended: false }));
router(app);

// Server setup
app.set('port', process.env.PORT || 3090)
app.listen(app.get('port'), console.log(`Server listening on http://localhost:${app.get('port')}`));
