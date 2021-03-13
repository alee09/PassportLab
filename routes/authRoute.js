const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated, forwardAdmin } = require("../middleware/checkAuth");

const router = express.Router();


router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
  })
);
router.get("/admin", forwardAdmin, (req, res) => res.render("admin"));

router.get('/github',
  passport.authenticate('github'));

router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' },
  {successRedirect:'/dashboards'}
  ),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
});

module.exports = router;