const { reval, student } = require('../../models');

module.exports = (req, res) => {
  Promise.all([
    student.findOne({ usn: req.usn }, { name: 1 }),
    reval.aggregate([
      { $match: { usn: req.usn } },
      { 
        $lookup: {
          from: "subject_details",
          localField: "sub_code",
          foreignField: "sub_code",
          as: "sem"
        }
      },
      {
        $unwind: "$sem"
      },
      {
        $project: {
          sem: "$sem.sem",
          reval: 1, sub_code: 1, sub_name: 1
        }
      }
    ])
  ])
  .then(data => {
    res.json({
      name: data[0].name,
      usn: req.usn,
      opted_subjects: data[1]
    })
  })
  .catch(_ => res.json({ error: "error while fetching data!!" }))
}