const router = require("express").Router();
const User = require("../model/User");
const UserModel = require("../model/User");
const { registerValidation } = require("../validation");

router.post("/register", async (req, res) => {
  // validate data before db call
  const validation = registerValidation(req.body);

  if (validation.error) {
    res.status(401).send(validation.error.message);
  } else {
    // Check if user exisits
    const emailExists = await User.findOne({ email: req.body.email });

    if (emailExists) {
      return res.status(400).send("Email already exisits");
    }

    // Create a new user
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    try {
      const savedUser = await user.save();
      res.send(savedUser);
    } catch (err) {
      res.status(400).send(err);
    }
  }
});

router.post("/login", (req, res) => {
  res.send("Login");
});

module.exports = router;
