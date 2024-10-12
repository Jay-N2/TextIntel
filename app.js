const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");

const app = express();

// Enable sessions to store user information
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize Passport and restore authentication state from the session
app.use(passport.initialize());
app.use(passport.session());

// Configure the Google OAuth 2.0 strategy
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "442686171411-u2s33c340m4cpu9ihrmv13jhgckbkbo8.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // You can save the user's profile data to your database here.
      return done(null, profile);
    }
  )
);

// Serialize user object to the session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from the session
passport.deserializeUser((user, done) => {
  done(null, user);
});

const ejs = require("ejs"); // Import EJS if you've installed it
// ... Other code ...

// Set EJS as the view engine (if you've installed it)
app.set("view engine", "ejs");
// app.set(__dirname + "/views/login.html");

// Create a route for Google OAuth login
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Callback route after Google authentication
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/login", // Change this to your desired page
    failureRedirect: "/",
  })
);

// // Profile route
// app.get("/login", (req, res) => {
//   if (req.isAuthenticated()) {
//     //res.render('login', { user: req.user });
//     const userName = req.user.displayName || "User";
//     res.sendFile(__dirname + "/views/login.html", { user: userName });
//     //res.render('login', { userDisplayName: req.user.displayName });
//   } else {
//     res.redirect("/");
//   }
// });

// Profile route
app.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    // Redirect authenticated users to localhost:8501
    res.redirect("http://localhost:8501");
  } else {
    res.redirect("/");
  }
});

// Welcome route
// app.get('/welcome', (req, res) => {
//   if (req.isAuthenticated()) {
//     res.send(`Welcome, ${req.user.displayName}! <a href="/">Logout</a>`);
//     //res.send('login.html');
//   } else {
//     res.redirect('/');
//   }
// });

// Logout route
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// Home route
app.get("/", (req, res) => {
  // res.send(
  //   'Welcome to the Google OAuth Example! <a href="/auth/google">Login with Google</a>'
  // );
  res.sendFile(__dirname + "/welcome.html");
});

app.get("/login-normal", (req, res) => {
  // Redirect to localhost:8502 or any other URL as needed
  res.redirect("http://localhost:8502");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
