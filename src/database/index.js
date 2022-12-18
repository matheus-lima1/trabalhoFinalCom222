const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost/gamesDB');
mongoose.Promise = global.Promise;

module.exports = mongoose;
