const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
//const formData = require("express-form-data");
const path = require("path");

const app = express();

const errorMiddleware = require("./middlewares/errors");

// setting up config file:
// setting up config file:
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").dotenv.config({ path: "backend/config/config.env" });
}

app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(fileUpload());
//app.use(formData.parse());

// Import all routes:
const products = require("./routes/product");
const auth = require("./routes/auth");
const order = require("./routes/order");
const payment = require("./routes/payment");

app.use("/api/v1", products);
app.use("/api/v1", auth);
app.use("/api/v1", payment);
app.use("/api/v1", order);

if (process.env.NODE_ENV === "PRODUCTION") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
  });
}

// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
