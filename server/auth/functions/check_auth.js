const jwt = require('jsonwebtoken');
const { key } = require('../../../credentials/credentials');

module.exports = (req, res) => {
  try {
    console.log('hey from check_auth end point!!')
    let token = jwt.verify(req.headers.token, key);
    res.json({ admin: token.admin, user: token.user });
  }catch (e){
    res.status(401).json({ error: "auth error" })
  }
}