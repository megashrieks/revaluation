const jwt = require('jsonwebtoken');
const { key } = require('../../../credentials/credentials');

module.exports = (req, res) => {
  try {
    let token = jwt.verify(req.headers.token, key);
    res.json({ admin: token.admin, user: token.user });
  }catch (e){
    res.status(401).json("auth error")
  }
}