const { sendFriendRequest, responseToFriendRequest, removeFriend } = require("../controllers/friendController");
const { protect } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/request", protect, sendFriendRequest);
router.post('/respond',protect,responseToFriendRequest)
router.delete('/remove',protect,removeFriend)
module.exports = router;
