require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const startUpDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const morgan = require("morgan");
const helmet = require("helmet");
const config = require("config");
const genre = require("./Routes/genres");
const home = require("./Routes/home");
app.set("view engine", "pug");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use(helmet.noCache());

mongoose
  .connect("mongodb://localhost:27017/vidly")
  .then(() => console.log("connected to mongoDB"))
  .catch(() => console.log("there is an error maybe"));
// *************
if (app.get("env") == "development") {
  app.use(morgan("dev"));
  startUpDebugger("Morgan");
}
// *************

// *******ROUTES******
app.use("/api/genres", genre);
app.use("/", home);
// *******ROUTES END******

// *****************
//db work
dbDebugger("db work");
// *****************

// console.log("app name " + config.get("name"));
// console.log("app name " + config.get("mail.host"));
// console.log("app name " + config.get("mail.password"));
// app.use((req, res, next) => {
//   console.log("Logging");
//   next();
// });
// app.use(require("./logger"));

// **********************************BASIC SETUP***************************
const Port = process.env.PORT || 4000;
app.listen(Port, () => {
  console.log("Listening on port" + Port);
});
