const { student } = require('../../models');

module.exports = (req, res) => {
  student.findOne({ usn: req.usn }, 
  { opted_subjects: 1, usn: 1, name: 1 })
  .then(data => res.json(data))
  .catch(err => res.json({ error: "error while fetching data!!" }));
}