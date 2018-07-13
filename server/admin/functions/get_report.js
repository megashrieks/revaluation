const start_sem = 1, end_sem = 8, inc = 1;
const { subject } = require('../../models');

module.exports = (req, res) => {

  subject.aggregate([
    { $match: { branch: req.branch } },   // match docs with given branch.
    { 
      $group:   // group subjects by sem.
      { 
        _id: "$sem", 
        subject_codes: { $push: '$sub_code' } 
      } 
    },
    { $unwind: "$subject_codes" },
    {
      $lookup: {
        from: 'reval_applicants',
        localField: 'subject_codes',
        foreignField: 'sub_code',
        as: "applicant"
      }
    },
    { 
      $project: { 
        "_id": 1, 
        "applicant.usn": 1,
        "applicatn.booklet_code": 1 
      } 
    },
    {
      $group: { _id: "$_id", applicants: { $push: '$applicant' } }
    }
  ]).then(data => res.json(data))
  .catch(err => res.json({ error: "error while fetching data!!"}))

}