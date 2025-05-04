const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const collection = require("./config");

const app = express();

// Middleware to parse JSON and URL encoded data
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Secret key for JWT
const SECRET_KEY = 'your_secret_key';  // You should store this in an environment variable


// use EJS as view engine
app.set('view engine', 'ejs');

// Home page route
app.get("/", (req, res) => {
  res.render("login");
});

// Signup page route
app.get("/signup", (req, res) => {
  res.render("signup");
});

// Register user
app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.username,
    password: req.body.password
  };

  // Check if the user already exists in the database
  const existingUser = await collection.findOne({ name: data.name });

  if (existingUser) {
    return res.send("User already exists. Please choose a different Username");
  }

  // Hash the password using bcrypt
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(data.password, saltRounds);
  data.password = hashedPassword;

  // Insert user data into the database
  await collection.insertMany(data);
  res.render("home");
});

// Login user
app.post("/login", async (req, res) => {
  try {
    const check = await collection.findOne({ name: req.body.username });

    if (!check) {
      return res.send("Username not found");
    }

    // Compare the hashed password from the database with the plain text password
    const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);

    if (isPasswordMatch) {
      // Generate JWT token
      // const token = jwt.sign({ id: check._id, username: check.name }, SECRET_KEY, { expiresIn: '1h' });
      res.render("home");
    } else {
      res.send("Wrong password");
    }

  } catch (error) {
    res.send("Error occurred during login");
  }
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(403).send('Access denied. No token provided.');
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(400).send('Invalid token.');
    }
    req.user = decoded;
    next();
  });
};

// Protected route example
app.get("/protected", verifyToken, (req, res) => {
  res.send(`Hello ${req.user.username}, you are authorized.`);
});

const port = 5001;
app.listen(port, () => {
  console.log(`Server running on Port : ${port}`);
});
