const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://matheuslima1:trabalhofinalcom222@cluster0.qlgtymm.mongodb.net/?retryWrites=true&w=majority');
mongoose.Promise = global.Promise;

module.exports = mongoose;
