const mongoose = require('mongoose');

module.exports = mongoose.model(
  'reval_applicant', 
  new mongoose.Schema({
    usn: String,
    sub_code: String,
    sub_name: String,
    booklet_code: Number
  })
);