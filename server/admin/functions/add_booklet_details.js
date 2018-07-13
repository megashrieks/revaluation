const { usn_booklet } = require('../../models');
const is_valid = require('../utils/excel_validation');

const format_array = ['string', 'string', 'number'];

module.exports = (req, res) => {
  let booklet_details = req.file_data;
  let check = is_valid(booklet_details, format_array, -1);  // no dup check.
  if(!check.success)
    return res.json({ error: check.error });

  Promise.all(booklet_details.map(data => {
    return new usn_booklet({
      usn: data[0],
      sub_code: data[1],
      booklet_code: data[2]
    }).save();
  }))
  .then(_ => res.json("success"))
  .catch(_ => res.json({ error: "error while uploading!! "}));
}