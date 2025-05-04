const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");
const isAuthenticated = require("../middleware/authMiddleware");

// Signup route
router.post("/signup", userController.signup);

// Login route
router.post("/login", userController.login);

// Check if user is logged in
router.get("/check", (req, res) => {
  if (req.session.user) {
    res.send(`You are logged in as ${req.session.user.username}`);
  } else {
    res.status(401).send("Not logged in");
  }
});


// Logout route
router.post("/logout", isAuthenticated, (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).send("Logout failed.");
    res.clearCookie("connect.sid");
    res.send("Logged out successfully");
  });
});

module.exports = router;
