const { reval } = require('../../models');
const { sendMail } = require('./send_mail');

// reval_subs: [{ sub_code: '', sub_name: '', sem: number }, ...],
// email: ''

module.exports = (req, res) => {
  reval.updateMany(
    { usn: req.usn },
    { $set: { reval: false } }
  )
  .then(_ => {
    return Promise.all(req.body.reval_subs.map(code => {
      return reval.updateOne(
        { usn: req.usn, sub_code: code },
        { $set: { reval: true } }
      )
    }))
  })
  .then(_ => sendMail(req.username, req.body.email, req.body.reval_subs, req.usn))
  .then(_ => res.json('sucessfully registered for revaluation'))
  .catch(err => res.json('error while registering!!try again'))
}
