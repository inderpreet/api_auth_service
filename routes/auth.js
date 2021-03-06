const router = require("express").Router();
const User = require("../model/User");
const UserModel = require("../model/User");
const TOkenModel = require("../model/Tokens");
const { registerValidation, loginValidation } = require("../validation");

/**
 * Route to create a new user into the database
 * Validate using JOI, check if email exisits and then create new user
 * use bcript
 * Async calls to database
 */
router.post("/register", async (req, res) => {
  // validate data before db call
  const validation = registerValidation(req.body);

  if (validation.error) {
    res.status(401).send(validation.error.message);
  } else {
    // Check if user exisits
    const emailExists = await User.findOne({ email: req.body.email });

    if (emailExists) {
      return res.status(400).send("Email already exists");
    }

    // Hash the password
    const bcrypt = require("bcrypt");
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user into database
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
    });

    // Save to DB
    try {
      const savedUser = await user.save();
      res.send({ user: savedUser._id });
    } catch (err) {
      res.status(400).send(err);
    }
  }
});

/**
 * Function to validated, user, password, generate JWT and send to client
 */
router.post("/login", async (req, res) => {
  // validate data before db call
  const validation = loginValidation(req.body);

  if (validation.error) {
    res.status(400).send(validation.error.message);
  } else {
    // Check if user exisits
    const userExists = await User.findOne({ email: req.body.email });

    if (!userExists) {
      return res.status(400).send("Email does not exist");
    }

    // Hash the password validation
    const bcrypt = require("bcrypt");
    const validPassword = await bcrypt.compare(
      req.body.password,
      userExists.password
    );
    if (!validPassword) {
      return res.status(400).send("Invalid Password");
    } else {
      // create token
      const jwt = require("jsonwebtoken");
      const token = jwt.sign(
        { _id: userExists._id },
        process.env.TOKEN_SECRET,
        { expiresIn: 60 }
      );
      res.header("auth-token", token).json({ token: token });
    }
  }
});

module.exports = router;
