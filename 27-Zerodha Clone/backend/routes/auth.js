const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../model/UserModel");

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: "User exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    password: hashedPassword,
  });

  await user.save();

  // Optional: auto login after signup
  req.login(user, (err) => {
    if (err) return res.status(500).json({ message: "Login error" });

    res.json({
      message: "User created",
      user: {
        id: user._id,
        username: user.username,
      },
    });
  });
});

// Login
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({
    message: "Logged in",
    user: {
      id: req.user._id,
      username: req.user.username,
    },
  });
});

// Logout
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.json({ message: "Logged out" });
  });
});

// Check Auth
router.get("/check", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      authenticated: true,
      user: {
        id: req.user._id,
        username: req.user.username,
      },
    });
  } else {
    res.json({ authenticated: false });
  }
});

module.exports = router;
