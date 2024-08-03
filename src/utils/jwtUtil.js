const jwt = require("jsonwebtoken");
const private = require("fs").readFileSync(__dirname + "/../../key.pem", 'utf8');
const public = require("fs").readFileSync(__dirname + "/../../key.pub", 'utf8');
const generateToken = ({ userId, role}) => {
  return jwt.sign({ userId, role}, private, { expiresIn: "30d", algorithm: 'RS256'})
}

const verifyToken = (token) => {
  return jwt.verify(token, public)
}

module.exports = {
  generateToken,
  verifyToken
}