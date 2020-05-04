
const bodyParser = require('body-parser');
var express = require('Express');
var app = express();
var cors = require('cors');
var route = require('./route.js');

app.use(cors());
//both index.js and things.js should be in same directory
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/user', route.user);
app.use('/api/resource', route.resource);

app.listen(3000);