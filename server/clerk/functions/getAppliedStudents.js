const { reval } = require('../../models');

const queryGen = revalStatus => [
  { $match: { reval: revalStatus } },
  {
    $group: {
      _id: "$usn",
      subjects: { 
        $push: { sub_code: "$sub_code", sub_name: "$sub_name" }
      }
    }
  }
];

// will return 2 arrays
// Array1 => all students who have applied and havent payed.
// Array2 => All students who have applied and payed.
module.exports = (req, res) => {
  Promise.all([
    reval.aggregate(queryGen(1)),
    reval.aggregate(queryGen(2))
  ])
  .then(d => res.json(d))
  .catch(err => res.json(err));
}