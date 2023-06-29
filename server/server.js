const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
// helps passing any request coming from frontend
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const employeeRoute = require("./routes/employeeRoute");
const errorHandler = require("./middleWare/errorMiddleware");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

// Middlewares(handling JSON data and data that comes via URL and sending data to client with bodyParser)
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Pointing to the uploads folder on uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes Middleware(all having prefix "api/users" then /register)
app.use("/api/users", userRoute);
app.use("/api/employees", employeeRoute);

// Routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

// Error Middleware
app.use(errorHandler);

// Connect ot DB and start server
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Speak Lord, Your server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
