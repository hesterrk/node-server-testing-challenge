const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../users/users-model.js");
const restrict = require("../middleware/restricted-middleware");
const validateUserInputs = require("../middleware/validateUserInputs")


// api/auth/register 

router.post("/register", validateUserInputs(), async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findBy({ username }).first();
    if (user) {
      console.log(user)
      return res.status(409).json({
        message: "Username is already taken, please use another one"
      });
    } else {
      if (!username || !password) {
        res.status(400).json({
          message: "enter all fields please"
        });
      }
    }

    const newUser = await Users.add(req.body)
    if(newUser) {
      console.log(newUser)
    const payload = {
      userId: newUser.id,
      
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return res.status(201).json({newUser, token});
  }
  } catch (error) {
    next(error);
  }
});

router.post("/login", validateUserInputs(), async (req, res, next) => {
  const authError = {
    message: "Invalid credentials"
  };

  try {
    let { username, password } = req.body;
    const user = await Users.findBy({ username }).first();
    if (!user) {
      return res.status(401).json(authError);
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(401).json(authError);
    }

    // Generating new token once user credentials valid

    const payload = {
      userId: user.id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.json({
      message: `Welcome ${user.username}!!!!`,
      token: token
    });
  } catch (error) {
    next(error);
  }
});


router.get("/protected", restrict(), async (req, res, next) => {
    try {
      res.json({
        message: "Welcome to this page, You are Authorised"
      });
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
