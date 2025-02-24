require("dotenv").config();
const express = require("express");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const { Pool } = require("pg");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// PostgreSQL Database Connection
const pool = new Pool({
  user: "postgres", // Change this to your DB user
  host: "localhost",
  database: "snapchat",
  password: "yourpassword", // Change this to your DB password
  port: 5432,
});

// Ensure users table exists
pool.query(
  `CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY, 
    username VARCHAR(255) UNIQUE NOT NULL, 
    password VARCHAR(255) NOT NULL
  )`
);

// Signup Endpoint
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
      username,
      hashedPassword,
    ]);
    res.status(201).send("User registered successfully");
  } catch (err) {
    res.status(500).send("Error registering user");
  }
});

// Multer Setup for Image Uploads
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Image Upload Endpoint
app.post("/upload", upload.single("image"), (req, res) => {
  res.status(200).send("Image uploaded successfully");
});

// Serve Uploaded Images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
