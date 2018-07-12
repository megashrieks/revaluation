const jwt = require('jsonwebtoken');
const { key } = require('../../../credentials/credentials');
const exp_in_seconds = 10000;
const { student, admin } = require('../../models');

// {user: '', password: '', admin: ''}

const get_token = data => {
  try {
    let token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + exp_in_seconds,
      username: data.username,
      admin: data.admin
    }, key);
    return token;
  }
  catch(e) { return -1; }
}

module.exports = (req, res) => {
  let [model, query] = req.body.admin ? 
  [admin, { username: req.body.username, password: req.body.password }] : 
  [student, { usn: req.body.username.toUpperCase(), dob: new Date(req.body.password) }];
  
  model.findOne(query)
  .then(data => {
    if(data === null) return res.json({ error: "invalid username or password!!"})
    let t = get_token(req.body);
    if(t === -1) throw "error";
    res.json({ token: t });
  })
  .catch(_ => res.status(401).json({ error: "error while loggin in!" }))
}