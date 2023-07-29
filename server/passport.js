require("dotenv").config();
const pool = require("./config/db");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const LocalStrategy = require("passport-local").Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_ID,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET_ID,
      callbackURL: "/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.use(
  new LocalStrategy(async function verify(username, password, done) {
    try {
      const result = await pool.query(
        'SELECT * FROM "user" WHERE "email" = $1 AND "password"=$2',
        [username, password]
      );
      if (result.rows.length === 0) {
        return done(null, false, {
          message: "Incorrect username or password.",
        });
      }
      const user = {
        id: result.rows[0].email,
        name: result.rows[0].name,
        image: result.rows[0].image,
        editFlag: result.rows[0].editFlag,
      };
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
