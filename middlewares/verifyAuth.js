function verifyAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/users/login"); // Redirect to login if the user is not authenticated
}
module.exports = verifyAuth;
