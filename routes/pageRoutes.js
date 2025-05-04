const express = require("express");
const router = express.Router();
const path = require("path");
const isAuthenticated = require("../middleware/authMiddleware");

// Index/Home page
router.get("/", (req, res) => {
  console.log("Session user:", req.session.user);
  if (req.session.user) {
    res.redirect("/dashboard");
  } else {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  }
});

// Login Page
router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/login.html"));
});

// Signup Page
router.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/signup.html"));
});

// Dashboard route (protected)
router.get("/dashboard", isAuthenticated, (req, res) => {
  // If authenticated, serve the dashboard
  res.sendFile(path.join(__dirname, "../public/dashboard.html"));
});

// File Integrity Checker (protected)
router.get("/file-integrity-checker", isAuthenticated, (req, res) => {
    // If authenticated, serve the page
    res.sendFile(path.join(__dirname, "../public/file-integrity-checker.html"));
})

// Access the username
router.get("/user-info", (req, res) => {
    if (req.session.user) {
        res.json({ username: req.session.user.username });
    }
    else  {
        res.status(401).json({ error: "Not logged in" });
    }
})

module.exports = router;
