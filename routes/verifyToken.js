const jwt = require("jsonwebtoken");
const { model } = require("mongoose");
const User = require("../model/User");

async function verifyToken(req, res, next) {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send("Access Denied");
  } else {
    try {
      const verify = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = verify;
      // test token agains users in DB
      const validID = await User.findOne({ _id: verify._id });
      if (validID) {
        next();
      } else {
        res
          .status(400)
          .send({ Error: "Invalid Token Used. Cannot find user in DB" });
      }
    } catch (e) {
      if (e.name === "TokenExpiredError") {
        res.status(400).send({ Error: "Expired Token Used" });
        console.log({ Error: "Expired Token Used" });
      } else {
        res.status(400).send(e);
      }
      return;
    }
  }
}

module.exports = verifyToken;
