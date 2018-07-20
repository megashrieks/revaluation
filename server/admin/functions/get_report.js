const { reval } = require('../../models');

module.exports = (req, res) => {
  reval.aggregate([
    { $match: { reval: true } },
    {
      $lookup: {
        from: "subject_details",
        localField: "sub_code",
        foreignField: "sub_code",
        as: "sub_detail" 
      }
    },
    { $unwind: "$sub_detail" },
    { $match: { "sub_detail.branch": req.body.branch } },
    {
      $project: {
        "usn": 1, "sub_code": 1, "sub_name": 1, 
        "sem": "$sub_detail.sem", "branch": "$sub_detail.branch",
      }
    },
    { 
      $group: {
        _id: { sem: "$sem", sub_code: "$sub_code" },
        "data": { $push: "$$ROOT" }
      }
    },
    {
      $group: {
        _id: "$_id.sem",
        "sem_details": { $push: "$$ROOT" }
      }
    }
  ])
  .then(data => res.json(data))
  .catch(err => res.json({ error: "error while fetching data!!"}))

}