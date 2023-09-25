const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  addGoogleGitUser,
  addNewUser,
  login,
} = require("../controlllers/addUser");
router.get("/login/failed", async (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/login/success", async (req, res) => {
  console.log("called");
  console.log(req.session.user);
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
    res.redirect("https://share-expense-rosy.vercel.app/");
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
    const user = await addGoogleGitUser(email, name, image, "Google");
    req.session.user = user;
    res.redirect("https://share-expense-rosy.vercel.app");
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
    const user = await addGoogleGitUser(email, name, image, "Github");

    req.session.user = user;
    res.redirect("https://share-expense-rosy.vercel.app/home");
  }
);

router.post("/signup", addNewUser);
router.post("/login/local", login);
module.exports = router;
