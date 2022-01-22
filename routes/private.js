const router = require("express").Router();
const verifyToken = require("./verifyToken");

router.get("/", verifyToken, (req, res) => {
  res.json({ data: "My data after verification with JWT", req: req.user });
});

module.exports = router;
