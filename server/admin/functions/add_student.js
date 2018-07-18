const { student } = require('../../models');

// student_data: { ... }

module.exports = (req, res) => {
  let student_data = req.body.student_data;
  student_data.usn = student_data.usn.toUpperCase();
  student.findOne({ usn: student_data.usn })
  .then(data => {
    if(data === null)
      return new student(student_data).save();
    return Promise.resolve(-1);
  })
  .then(data => {
    if(data !== -1)
      return res.json('student registration successful');
    res.json('duplicate exists in db!');
  })
  .catch(_ => res.json({ error: "error while uploading to db" }));
}