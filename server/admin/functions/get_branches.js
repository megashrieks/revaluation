const { subject } = require('../../models');

module.exports = (req, res) => {
  subject.distinct("branch")
  .then(data => res.json(data))
  .catch(err => res.json({ error: "error while fetching data!!" }))
}