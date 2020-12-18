// packages import
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const helmet = require("helmet");
// const compression = require('compression');
const app = express();

app.use(bodyParser.json());
app.use(helmet());

// app.use(compression());
// app.use('/images', express.static(path.join(__dirname, 'images')));

// const logRequestStart = (req, res, next) => {
//   console.info(`${req.method} ${req.originalUrl}`);
//   next();
// };

// app.use(logRequestStart);

// Default Headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS,GET,POST,PUT,PATCH,DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/", (req, res, next) => {
  res.status(200).json({ message: "Connected Successfully" });
});

// Error Handler
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  console.log(error);
  res.status(status).json({ success: false, message: message, data: data });
});

// Connect to database and start app
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => {
    console.log("MongoDb connected");
  })
  .catch((err) => console.log(err));

module.exports = app;
