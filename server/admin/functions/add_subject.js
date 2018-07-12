const { subject } = require('../../models');


module.exports = (req, res) => {
  new subject(req.body.subject)
  .save()
  .then(_ => res.json("success"))
  .catch(_ => res.json({ error: "error while uploading to db!!"}))
}
