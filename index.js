const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");

// Parse form and JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session middleware
app.use(
  session({
    secret: "keykey",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    },
  })
);


// Import routes
const authRoutes = require("./routes/authRoutes");
const pageRoutes = require("./routes/pageRoutes");
const integrityRoutes = require("./routes/check-file.integrity");
const extensionRoutes = require("./routes/check-file-extension")

app.use("/api", authRoutes);
app.use("/api", integrityRoutes); 
app.use("/api", extensionRoutes);
app.use("/", pageRoutes);

// Serve static files AFTER routes
app.use(express.static(path.join(__dirname, "public")));

// 404 fallback (keep this LAST)
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
