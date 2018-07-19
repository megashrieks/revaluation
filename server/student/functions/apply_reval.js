const { reval, usn_booklet, subject, student } = require('../../models');

// reval_subs: [{ sub_code: '', sub_name: ''}, ...]

module.exports = (req, res) => {
  reval.updateMany(
    { usn: req.usn },
    { $set: { reval: false } }
  )
  .then(_ => {
    return Promise.all(req.body.reval_subs.map(sub => {
      return reval.updateOne(
        { usn: req.usn, sub_code: sub.sub_code },
        { $set: { reval: true } }
      )
    }))
  })
  .then(_ => res.json('sucessfully registered for revaluation'))
  .catch(err => res.json('error while registering!!try again'))
}
