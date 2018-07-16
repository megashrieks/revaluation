const start_sem = 1, end_sem = 8, inc = 1;
const { reval } = require('../../models');

module.exports = (req, res) => {
  reval.aggregate([
    { $match: { branch: req.body.branch } },   // match docs with given branch.
    { 
      $group:   // group subjects by sem.
      { 
        _id: "$sem", 
        subject_codes: { $push: '$sub_code' } 
      } 
    },
    { $unwind: "$subject_codes" }
  ]).then(data => res.json(data))
  .catch(err => res.json({ error: "error while fetching data!!"}))

}