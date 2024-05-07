require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  if (!req.cookies.token) {
    return res.status(401).send({ message: "Unauthorized Access" });
  }
  const token = req.cookies.token;
  jwt.verify(token, process.env.JWT_TOKEN_SECRET, function (err, decoded) {
    if (err) {
      return res.status(401).send({ message: "Unauthorized Access" });
    }
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
