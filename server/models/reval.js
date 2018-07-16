const mongoose = require('mongoose');

module.exports = mongoose.model(
  'reval_applicant', 
  new mongoose.Schema({
    usn: String,
    branch: String,
    sub_code: String,
    sub_name: String,
    sem: Number,
    booklet_code: Number
  })
);