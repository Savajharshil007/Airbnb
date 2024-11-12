const User = require("../models/user");

module.exports.renderSignupForm = (req, res) => {
  res.render("./users/signup.ejs");
};

module.exports.signup = async (req, res, next) => {
  try {
    let { username, password, email } = req.body;
    let newUser = new User({ email, username });
    const registedUser = await User.register(newUser, password);
    // console.log(registedUser);
    req.login(registedUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "welcome ro Wanderlust");
      res.redirect("/listings");
    });
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/signup");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("./users/login.ejs");
};

module.exports.login = async (req, res, next) => {
  req.flash("success", "Welcome back to Wanderlust! You are logged in!");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out!");
    res.redirect("/listings");
  });
};
