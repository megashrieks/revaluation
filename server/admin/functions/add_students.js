const xlsx = require('node-xlsx').default;
const { student } = require('../../models');
const is_valid = require('../../utils/excel_validation');

const format_array = [
  "string",
  "string",
  "number",
  "string",
  "string"
];

module.exports = (req, res) => {
  let student_data = req.file_data;
  let check = is_valid(student_data, format_array, 0);
  if(!check.success)
    res.json({ error: check.error });
  else 
    Promise.all(student_data.map(stud => {
      return new student({
        usn: stud[0],
        name: stud[1],
        dob: new Date((stud[2] - (25567+2))*86400*1000),
        branch: stud[3],
        email: stud[4]
      }).save();
    }))
    .then(data => res.json("data succesfully uploaded to db"))
    .catch(err => res.json({ error: "error while uploading to db" }));
}