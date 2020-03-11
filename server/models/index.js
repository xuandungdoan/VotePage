const mongoose = require('mongoose');

mongoose.set("debug", true);
mongoose.Promise = global.Promise;
const uri = process.env.ENV_Uri ||'mongodb://localhost/mern-project-2';
mongoose.connect(uri, {useCreateIndex:true, useNewUrlParser:true, useUnifiedTopology:true});

module.exports.User = require('./user');
module.exports.Poll = require('./poll');
