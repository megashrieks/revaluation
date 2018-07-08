const jwt = require('jsonwebtoken');
const { key } = require('../../../credentials');
const exp_in_seconds = 10000;

// token in header.
// user: '', password: '', admin: ''

module.exports = (req, res) => {
  try {
    let token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + exp_in_seconds,
      user: req.body.user,
      admin: req.body.admin
    }, key);
    res.json({ data: "hey" });
  }catch {
    res.status(401).json({ error: "auth error" })
  }
}