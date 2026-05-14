const { name } = require('ejs');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI);
const userSchema = new mongoose.Schema({
  image: String,
  email: String,
  name: String,
});

module.exports = mongoose.model('user', userSchema);
