const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  createTask,
  updateTask,
  deleteTask,
  getAllTasks,
  getFilteredTasks,
  assignTaskToFriend,
  updateTaskStatus,
} = require("../controllers/taskController");

router.post("/create", protect, createTask);
router.put("/update/:id", protect, updateTask);
router.delete("/delete/:id", protect, deleteTask);
router.get("/viewAll", protect, getAllTasks);
router.get("/filter", protect, getFilteredTasks);
router.post("/assign", protect, assignTaskToFriend);
router.patch("/status/:id",protect,updateTaskStatus)
module.exports = router;
