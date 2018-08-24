const { reval } = require('../../models');
const { sendMail } = require('./send_mail');

// reval_subs: [{ sub_code: '', sub_name: '', sem: number }, ...],
// email: ''
// username: ''

module.exports = (req, res) => {
  reval.updateMany(
    { usn: req.usn },
    { $set: { reval: false } }
  )
  .then(_ => {
    return Promise.all(req.body.reval_subs.map(({ sub_code }) => {
      return reval.updateOne(
        { usn: req.usn, sub_code },
        { $set: { reval: true } }
      )
    }))
  })
  .then(_ => sendMail(req.body.username, req.body.email, req.body.reval_subs, req.usn))
  .then(_ => res.json('sucessfully registered for revaluation'))
  .catch(err => res.json('error while registering!!try again'))
}
