const { protect } = require("../middlewares/authMiddleware");

const router = require("express").Router();
router.get("/api/dashboard", protect, (req, res) => {
  res.status(200).json({ data: req.user, message: "you can access dashboard" });
});

module.exports = router;
