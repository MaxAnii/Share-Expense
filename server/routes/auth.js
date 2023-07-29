const express = require("express");
const router = express.Router();
const passport = require("passport");
const { addGoogleGitUser, addNewUser } = require("../controlllers/addUser");
router.get("/login/failed", async (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});
router.post("/login/failed", async (req, res) => {
  console.log("failed");
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/login/success", async (req, res) => {
  if (req.session.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.session.user,
    });
  }
});

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("http://localhost:3000/");
  });
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login/failed" }),
  async function (req, res) {
    // Successful authentication, redirect home.
    const email = req.user.id;
    const name = req.user.displayName;
    const image = req.user.photos[0].value;
    const user = await addGoogleGitUser(email, name, image);
    req.session.user = user;
    res.redirect("http://localhost:3000/");
  }
);
router.get("/github", passport.authenticate("github", { scope: ["profile"] }));
router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/login/failed",
  }),
  async function (req, res) {
    // Successful authentication, redirect home.
    const email = req.user.emails[0].value;
    const name = req.user.displayName;
    const image = req.user.photos[0].value;
    const user = await addGoogleGitUser(email, name, image);

    req.session.user = user;
    res.redirect("http://localhost:3000/home");
  }
);

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login/failed" }),
  function (req, res) {
    // Successful authentication, redirect home.
    req.session.user = req.user;
    res.redirect("http://localhost:3000");
  }
);

router.post("/signup", addNewUser);
module.exports = router;
