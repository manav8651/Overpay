const passport = require("passport");
const express = require("express");
// require("../controllers/authController");

const router = express.Router();

router.get(
  "/",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/auth/google/failure",
  })
);

module.exports = router;
