const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const decoded_data = jwt.verify(req.headers.token, key);
    if(decoded_data.admin) next();
    else throw "error";
  }catch(err) {
    res.status(401).json('auth error');
  }
}