const mongoose = require('mongoose');

module.exports = mongoose.model(
  'student_detail', 
  new mongoose.Schema({
    usn: String,
    name: String,
    dob: Date,
    branch: String,
    email: String,
  })
);