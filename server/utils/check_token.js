const jwt = require('jsonwebtoken');
const { key } = require('../../credentials/credentials');

module.exports = (admin_flag) => (req, res, next) => {
  try {
    const decoded_data = jwt.verify(req.headers.token, key);
    if(decoded_data.admin == admin_flag) {
      if(!admin_flag)
        req.usn = decoded_data.username;
      next();
    }
    else throw "error";
  }catch(err) {
    res.status(401).json({ error: 'auth error' });
  }
}