const { student } = require('../../models');

// { opted_subject: { sub_code: '', sub_name: '' } }

module.exports = (req, res) => {
  student.findOneAndUpdate(
    { usn: req.body.usn.toUpperCase() },
    { $addToSet: { opted_subjects: req.body.opted_subject } }
  ).then(data => res.json('success'))
  .catch(err => res.json({ error: "error while uploading!!"}))
}