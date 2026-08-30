const express = require("express");

const router = express.Router();

const {

login,

me,

logout

} = require("../controllers/authController");

const {

isAuthenticated

} = require("../middleware/authMiddleware");


router.post("/login", login);

router.get("/me", isAuthenticated, me);

router.post("/logout", logout);

module.exports = router;