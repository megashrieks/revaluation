const mongoose = require("mongoose");

module.exports = mongoose.model(
  "reval",
  new mongoose.Schema({
    usn: String,
    sub_code: String,
    sub_name: String,
    reval: { type: Number, default: 0 }
  })
);