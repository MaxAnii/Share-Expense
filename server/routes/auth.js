const express = require("express");
const router = express.Router();
const passport = require("passport");

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
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
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
  function (req, res) {
    // Successful authentication, redirect home.

    console.log(req.user);
    res.redirect("http://localhost:3000/home");
  }
);
router.get("/github", passport.authenticate("github", { scope: ["profile"] }));
router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: "http://localhost:3000/home",
    failureRedirect: "/login/failed",
  })
);

// router.post(
//   "/login",
//   passport.authenticate("local", { failureRedirect: "/login/failed" }),
//   function (req, res) {
//     res.redirect("/");
//   }
// );
// router.post(
//   "/login",
//   passport.authenticate("local", { failureRedirect: "login/failed" }),
//   function (req, res) {
//     res.redirect("http://localhost:3000/home");
//   }
// );

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login/failed" }),
  function (req, res) {
    // Successful authentication, redirect home.

    console.log("successful");
    // res.redirect("http://localhost:3000/home");
  }
);
module.exports = router;
