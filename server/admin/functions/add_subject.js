const { subject } = require('../../models');


module.exports = (req, res) => {
  let sub = req.body.subject;
  new subject({
    ...sub,
    sub_code: String(sub.sub_code).toUpperCase(),
    sub_name: String(sub.sub_name).toUpperCase()
  })
  .save()
  .then(_ => res.json("success"))
  .catch(_ => res.json("error while uploading to db!!"))
}
