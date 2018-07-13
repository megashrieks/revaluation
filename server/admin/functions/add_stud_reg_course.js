const { student } = require('../../models');

// { usn: ..., opted_subject: { sub_code: '', sub_name: '' } }

module.exports = (req, res) => {
  student.findOneAndUpdate(
    { usn: req.body.usn },
    { $push: { opted_subjects: req.body.opted_subject } }
  );
}