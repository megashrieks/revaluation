const mongoose = require('mongoose');

module.exports = mongoose.model(
  'administrator', 
  new mongoose.Schema({
    name: String,
    branch: String,
    email: String,
    contact_no: String,
    username: String,
    password: String
  })
);
