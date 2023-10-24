const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const authRoute = require("./routes/auth");
const mainRoute = require("./routes/mainRoutes");
<<<<<<< HEAD
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();
=======
const { check } = require("./controlllers/addUser");
>>>>>>> adfb086a38e11df6a1b5ac3fcc248b7c80b4f98a
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  session({
<<<<<<< HEAD
    secret: process.env.SECRET,
=======
    secret: process.env.SECRET_KEY,
>>>>>>> adfb086a38e11df6a1b5ac3fcc248b7c80b4f98a
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 15 * 24 * 60 * 60 * 1000, // 1 day in milliseconds
<<<<<<< HEAD
=======
      // domain: "localhost:3000",
      // domain: "share-expense-gjys.vercel.app",
>>>>>>> adfb086a38e11df6a1b5ac3fcc248b7c80b4f98a
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate("session"));
app.use(
  cors({
<<<<<<< HEAD
    origin: ["http://localhost:3000"],
    methods: "GET,POST,PUT,DELETE",
=======
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
>>>>>>> adfb086a38e11df6a1b5ac3fcc248b7c80b4f98a
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.get("/check", check);
app.use("/auth", authRoute);
app.use("/user", mainRoute);
<<<<<<< HEAD
app.get("/check", async (req, res) => {
  res.json({
    message: "connection successful",
  });
});

app.listen("5000", () => {
  console.log("server  is alive");
});
=======

module.exports = app;
>>>>>>> adfb086a38e11df6a1b5ac3fcc248b7c80b4f98a
