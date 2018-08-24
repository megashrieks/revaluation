const { reval, subject } = require('../../models');
const is_valid = require('../../utils/excel_validation');

const format_array = ['string', 'string'];

module.exports = (req, res) => {
  let stud_reg_courses = req.file_data;
  let check = is_valid(stud_reg_courses, format_array, -1);  // no dup check.
  if(!check.success)
    return res.json({ error: check.error });

  Promise.all(stud_reg_courses.map(data => {
    subject.findOne({ sub_code: data.sub_code }, { sub_name: 1 })
    .then(({ sub_name }) => {
      if(!sub_name)
        return Promise.reject('sub_name_err');
      return reval({
        usn: data[0].toUpperCase(),
        sub_code: data[1].toUpperCase(),
        sub_name: sub_name.toUpperCase()
      })
    })
  }))
  .then(_ => res.json("success"))
  .catch(_ => res.json({ error: "error while uploading!! "}));
}