const jwt = require("jsonwebtoken");
const { model } = require("mongoose");

function verifyToken(req, res, next) {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send("Access Denied");
  } else {
    try {
      const verify = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = verify;
      next();
    } catch (err) {
      res.status(400).send("Invalid Token");
    }
  }
}

module.exports = verifyToken;
