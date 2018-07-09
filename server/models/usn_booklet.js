const mongoose = require('mongoose');

module.exports = mongoose.model(
  'booklet_detail', 
  new mongoose.Schema({
    usn: String,
    sub_code: String,
    booklet_code: String
  })
);