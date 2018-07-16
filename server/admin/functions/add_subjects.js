const xlsx = require('node-xlsx').default;
const { subject } = require('../../models');
const is_valid = require('../../utils/excel_validation');

const format_array = [
  "string",
  "string",
  "number",
  "string",
  "string"
];

module.exports = (req, res) => {
  let subject_data = req.file_data;
  let check = is_valid(subject_data, format_array, 0);
  if(!check.success)
    res.json({ error: check.error });
  else 
    Promise.all(subject_data.map(sub => {
      return new subject({
        sub_code: sub[0],
        sub_name: sub[1],
        sem: sub[2],
        branch: sub[3],
        sub_type: sub[4]
      }).save();
    }))
    .then(data => res.json("data succesfully uploaded to db"))
    .catch(err => res.json({ error: "error while uploading to db" }));
}