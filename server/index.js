const express = require("express");
const session = require("express-session");
const passportSetup = require("./passport");
const passport = require("passport");
const cors = require("cors");
const authRoute = require("./routes/auth");
const mainRoute = require("./routes/mainRoutes");
const app = express();
app.use(express.json());
app.use(
  session({
    secret: "ansar",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 15 * 24 * 60 * 60 * 1000, // 1 day in milliseconds
      domain: "localhost:3000",
      domain: "localhost",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate("session"));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoute);
app.use("/user", mainRoute);
app.listen("5000", () => {
  console.log("server  is alive");
});
