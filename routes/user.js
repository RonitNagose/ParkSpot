const express = require("express");
const User = require("../models/User");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const passport = require("passport");
const { saveRedirect } = require("../middleware");

const userControllers = require("../controllers/user");


 router.route("/signup")
    .get(userControllers.signup)
    .post(wrapAsync(userControllers.signupForm));

router.route("/login")
    .get(userControllers.login)
    .post(saveRedirect,passport.authenticate('local', { failureRedirect: '/login',failureFlash:true }),userControllers.loginForm)

router.get("/logout",userControllers.logout)


router.get("/home",userControllers.redirectToHomePage)
    

module.exports = router;