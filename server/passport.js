require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const LocalStrategy = require("passport-local");
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_ID,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //     return cb(err, user);
      //   });
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
      //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //     return cb(err, user);
      //   });
      done(null, profile);
    }
  )
);

// passport.use(
//   new LocalStrategy(function (username, password, done) {
//     // User.findOne({ username: username }, function (err, user) {
//     //   if (err) {
//     //     return done(err);
//     //   }
//     //   if (!user) {
//     //     return done(null, false);
//     //   }
//     //   if (!user.verifyPassword(password)) {
//     //     return done(null, false);
//     //   }
//     const user = {
//       email: "test",
//     };
//     console.log("DSaf");
//     return done(null, user);
//     // });
//   })
// );
// passport.use(
//   new LocalStrategy(async function (username, password, done) {
//     try {
//       console.log("hi");
//       // Find the user by their username in the database
//       // const user = await db.oneOrNone("SELECT * FROM users WHERE username = $1", [
//       //   username,
//       // ]);

//       // if (!user) {
//       //   return done(null, false); // User not found
//       // }

//       // // Verify the user's password using bcryptjs
//       // const passwordMatch = await bcrypt.compare(password, user.password);

//       // if (!passwordMatch) {
//       //   return done(null, false); // Passwords do not match
//       // }
//       const user = {
//         email,
//         pass,
//       };
//       return done(null, user); // Authentication successful
//     } catch (error) {
//       return done(error);
//     }
//   })
// );
// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: "username", // The field used for the email input
//       passwordField: "password", // The field used for the password input
//     },
//     async function (email, password, done) {
//       try {
//         // Find the user with the provided email in your database
//         // const user = await User.findOne({ email });

//         // // If user is not found or password is incorrect, return false
//         // if (!user || !user.isValidPassword(password)) {
//         //   return done(null, false);
//         // }

//         // If user is found and password is correct, return the user object
//         console.log(email, password);
//         return done(null, user);
//       } catch (error) {
//         return done(error);
//       }
//     }
//   )
// );

passport.use(
  new LocalStrategy(function verify(username, password, done) {
    db.get(
      "SELECT * FROM users WHERE username = ?",
      [username],
      function (err, user) {
        console.log(username + "dfgdf");
        // if (err) {
        //   return cb(err);
        // }
        // if (!user) {
        //   return cb(null, false, {
        //     message: "Incorrect username or password.",
        //   });
        // }
        // crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
        //   if (err) { return cb(err); }
        //   if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
        //     return cb(null, false, { message: 'Incorrect username or password.' });
        //   }
        return done(null, user);
        // });
      }
    );
  })
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
