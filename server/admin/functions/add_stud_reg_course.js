const { reval } = require('../../models');

// { usn: '', sub_code: '', sub_name: '' } }

module.exports = (req, res) => {
  new reval({
    usn: req.body.usn.toUpperCase(),
    sub_code: req.body.sub_code.toUpperCase(),
    sub_name: req.body.sub_name.toUpperCase()
  })
  .save()
  .then(data => res.json('sucessfuly added to db!'))
  .catch(err => res.json('error while uploading to db!!'));
}