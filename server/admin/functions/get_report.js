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
    { $match: { "sub_code": new RegExp(req.body.branch, 'i') } },
    {
      $project: {
        "usn": 1, 
        "sub_code": 1, 
        "sub_name": 1, 
        "sem": "$sub_detail.sem"
      }
    },
    {
      $lookup: {
        from: "booklet_details",
        let: { usn: "$usn", sub_code: "$sub_code" },
        pipeline: [
          { 
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$usn', '$$usn'] },
                  { $eq: ['$sub_code', '$$sub_code'] }
                ]
              }
            } 
          },
          {
            $project: { _id: 0, booklet_code: 1 }
          }
        ],
        as: "booklet_code"
      }
    },
    { $unwind: "$booklet_code" },
    { 
      $group: {
        _id: { sem: "$sem", sub_code: "$sub_code", sub_name: "$sub_name" },
        "applicants": { 
          $push: {
            usn: "$usn",
            booklet_code: "$booklet_code",
          } 
        }
      }
    },
    {
      $group: {
        _id: "$_id.sem",
        "sem_details": { $push: "$$ROOT" }
      }
    },
    {
      $project: {
        "sem": "$_id",
        "_id": 0,
        "sem_details": 1,
      }
    }
  ])
  .then(data => res.json(data))
  .catch(err => res.json({ error: "error while fetching data!!"}))

}