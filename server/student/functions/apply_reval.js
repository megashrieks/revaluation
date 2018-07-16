const { reval, usn_booklet } = require('../../models');

// reval_subs: [{ sub_code: '', sub_name: ''}, ...]

module.exports = (req, res) => {
  Promise.all(req.body.reval_subs.map(sub => {
    return usn_booklet.findOne(
      { usn: req.usn, sub_code: sub.sub_code },
      { booklet_code: 1 }
    )
    .then(data => new reval({    // assuming booklet code is available.
        usn: req.usn,
        sub_code: sub.sub_code,
        sub_name: sub.sub_name,
        booklet_code: data.booklet_code
      }).save()
    )
  }))
  .then(data => res.json('success'))
  .catch(err => res.json({ error: "error while uploading!" }));
}
