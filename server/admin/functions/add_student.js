const { student } = require('../../models');

// student_data: { ... }

module.exports = (req, res) => {
  new student(req.body.student_data).save()
  .then(_ => res.json({ data: "successfuly uploaded"}))
  .catch(_ => res.json({ error: "error while uploading to db" }));
}