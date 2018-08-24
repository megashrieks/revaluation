const { reval, subject } = require('../../models');

// { usn: '', sub_code: '' }

module.exports = (req, res) => {
  subject.findOne({ sub_code: req.body.sub_code }, { sub_name: 1 })
  .then(({sub_name}) => {
    if(!sub_name)
      return Promise.reject('sub_name_err');
    return new reval({
      usn: req.body.usn.toUpperCase(),
      sub_code: String(req.body.sub_code).toUpperCase(),
      sub_name: sub_name.toUpperCase()
    }).save();
  })
  .then(data => res.json('sucessfuly added to db!'))
  .catch(err => {
    res.json(err === 'sub_name_err' ? 
    "No such subject found!!" : "Error while uploading to db!");
  });
}