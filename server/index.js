const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const authRoute = require("./routes/auth");
const mainRoute = require("./routes/mainRoutes");
const { check } = require("./controlllers/addUser");
const app = express();
app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 15 * 24 * 60 * 60 * 1000, // 1 day in milliseconds
      domain: "localhost:3000",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate("session"));
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: true,
    credentials: true,
    optionsSuccessStatus: 204,
  })
);
app.get("/check", check);
app.use("/auth", authRoute);
app.use("/user", mainRoute);

module.exports = app;
