const { reval } = require('../../models');
const is_valid = require('../../utils/excel_validation');

const format_array = ['string', 'string', 'string'];

module.exports = (req, res) => {
  let stud_reg_courses = req.file_data;
  let check = is_valid(stud_reg_courses, format_array, -1);  // no dup check.
  if(!check.success)
    return res.json({ error: check.error });

  Promise.all(stud_reg_courses.map(data => {
    return new reval({
      usn: data[0].toUpperCase(),
      sub_code: data[1].toUpperCase(),
      sub_name: data[2].toUpperCase()
    }).save();
  }))
  .then(_ => res.json("success"))
  .catch(_ => res.json({ error: "error while uploading!! "}));
}