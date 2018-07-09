const mongoose = require('mongoose');

module.exports = mongoose.model(
  'subject_detail', 
  new mongoose.Schema({
    sub_code: String,
    sub_name: String,
    sem: Number,
    branch: String,
    sub_type: String
  })
);