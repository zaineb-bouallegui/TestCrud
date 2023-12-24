const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables from the .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const connectionString = process.env.MONGODB_URI;

// Enable CORS for all routes
app.use(cors());

// Use JSON parsing middleware
app.use(express.json());

// Connect to the MongoDB database
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Handle database connection errors
db.on("error", (error) => {
  console.error("Error connecting to the database:", error);
});

// Log a message when the database connection is open
db.once("open", () => {
  console.log("Connected to the database!");
});

// Use the user router to handle user-related routes
app.use("/users", require("./routes/user"));

// Define a basic route
app.get("/", (req, res) => {
  res.send("Welcome to your application!");
});

// Handle unhandled routes
app.use((req, res) => {
  res.status(404).send("Not Found");
});

// Handle errors globally
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Listen on the specified port
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
