const express = require("express");
const { loginUser, registerUser , logout } = require("../controllers/authController");
const {
  protect,
  redirectIfAuthenticated,
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/login", loginUser);
router.get("/login", redirectIfAuthenticated);
router.post("/register", registerUser);
router.get("/logout", logout);

module.exports = router;
