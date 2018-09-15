const { reval } = require('../../models');

module.exports = (req, res) => {
  let flag = (req.url === '/approve' ? 2 : 1);
  reval.updateMany(
    { usn: String(req.body.usn).toUpperCase() }, 
    { reval: flag }
  )
  .then(({n}) => {
    res.json(n > 0 ? 
      "Updation successfull" : "Oops!! something went wrong" 
    );
  })
  .catch(err => res.json("Oops!! something went wrong"));
}