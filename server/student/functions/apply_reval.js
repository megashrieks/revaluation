const { reval, usn_booklet, subject, student } = require('../../models');

// reval_subs: [{ sub_code: '', sub_name: ''}, ...]

module.exports = (req, res) => {
  Promise.all(req.body.reval_subs.map(curr_sub => {
    let to_save = {
      usn: req.usn, branch: null,
      sub_code: curr_sub.sub_code, sem: null,
      sub_name: curr_sub.sub_name, booklet_code: null
    };
    let find_semNbranch = subject.findOne(
      { sub_code: curr_sub.sub_code }, { sem: 1, branch: 1 }
    )
    let find_booklet_code = usn_booklet.findOne(
      { usn: req.usn, sub_code: curr_sub.sub_code }, { booklet_code: 1 }
    )
    return Promise.all([find_semNbranch, find_booklet_code])
    .then(data => {
      to_save.sem = data[0].sem;to_save.branch = data[0].branch;
      to_save.booklet_code = data[1].booklet_code;
      return new reval(to_save).save();
    })
    .then(_ => student.findOneAndUpdate(
      { usn: req.usn, "opted_subjects.sub_code": curr_sub.sub_code },
      { $set: { "opted_subjects.$.reval": true } }
    ));
  }))
  .then(data => res.json('success'))
  .catch(err => res.json({ error: "error while uploading!" }));
}
