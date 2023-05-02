const path = require("path");
const express = require("express");
const session = require("express-session");
const bcrypt = require("bcryptjs");

// Mock database to store usernames and passwords by username.
const db = {
  test: {
    username: "test",
    password: "test",
  },
  testhashed: {
    username: "testhashed",
    password: "$2a$10$7WK77kJZ0qzrcgOoE3MszOWuPz2bzPueuSCePScbQnkKwCUx2045q",
  },
};

const app = express();

// Set up EJS as the view engine. We'll use this to serve pages from the views/ directory.
// For example, res.render("index") will render views/index.ejs.
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Built-in middleware to extract data from req.body.
app.use(express.urlencoded({ extended: false }));

// Set up the session middleware. This will allow us to store data in the user's session.
app.use(
  session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: "shhhh, very secret", // secret key used to sign the session ID cookie
  })
);

// Toast-style messaging middleware.
// This will allow us to set a message in the session, and then display it on the next
// page. This is useful for displaying error messages or success messages to the user.
app.use((req, res, next) => {
  const { error, success } = req.session;

  // Flush existing session messages
  req.session.error = req.session.success = null;
  res.locals.message = ""; // res.locals is how we store local variables in Express

  if (error) {
    res.locals.message = `<p class="msg error">${error}</p>`;
  }
  if (success) {
    res.locals.message = `<p class="msg success">${success}</p>`;
  }

  next(); // move on to the next middleware
});

// Middleware to restrict access to a route.
// When a user logs in, we store their username in the session. If req.session.username
// doesn't exist, don't call next(). Instead, redirect to the homepage and display an
// error message.
const restrict = (req, res, next) => {
  if (req.session.username) {
    next();
  } else {
    req.session.error =
      "Access denied! Try logging in again or create a new account.";
    res.redirect("/");
  }
};

// The homepage.
app.get("/", (req, res) => {
  res.render("index");
});

// Handle user login.
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = db[username];

  if (bcrypt.compareSync(password, user?.password)) {
    // Regenerate session data to prevent fixation attacks.
    // See: https://owasp.org/www-community/attacks/Session_fixation
    req.session.regenerate(() => {
      req.session.username = username;
      req.session.success = "Logged in successfully!";
      res.redirect("/login/success");
    });
  } else {
    // User doesn't exist or password doesn't match
    req.session.error =
      "Authentication failed, please check your username and password.";
    res.redirect("/");
  }
});

// Handle user registration.
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  
  if (!db[username]) {
    // Hash password before storing it
    const salt = bcrypt.genSaltSync();
    db[username] = { username, password: bcrypt.hashSync(password, salt) };
    req.session.success = "Registration successful! You can now log in.";
  } else {
    req.session.error = "Unable to create a new user. Try logging in.";
  }

  res.redirect("/");
});

// A restricted route that can only be accessed if the user is logged in.
app.get("/login/success", restrict, (req, res) => {
  res.render("login-success", { username: req.session.username });
});

// Destroy the user's session cookie to log them out.
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

app.listen(8000, () => console.log("Server running on port 8000"));
