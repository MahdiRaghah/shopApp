const app = require("./app");
const connectDatabase = require("./config/database");

const cloudinary = require("cloudinary");

// Handle Uncaught exceptions
process.on("uncaughtException", (error) => {
  console.log(`ERROR: ${error.stack}`);
  console.log("Shutting down due to uncaught exception");
  process.exit(1);
});

// setting up config file:
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").dotenv.config({ path: "backend/config/config.env" });
}

// Connecting to database:
connectDatabase();

// Setting up cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

// Handle the unhandled promise rejection
process.on("unhandledRejection", (error) => {
  console.log(`ERROR: ${error.message}`);
  console.log("Shutting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
