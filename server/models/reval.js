const mongoose = require('mongoose');

module.exports = mongoose.model(
  'reval_applicant', 
  new mongoose.Schema({
    usn: String,
    reval_subjects: [
      new mongoose.Schema({
        sub_code: String, 
        sub_name: String,
        booklet_code: String
      })
    ]
  })
);