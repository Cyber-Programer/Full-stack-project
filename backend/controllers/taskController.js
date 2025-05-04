const taskModel = require("../models/taskModel");
const userModel = require("../models/userModel");

exports.createTask = async (req, res) => {
  try {
    if (!req.body)
      return res.status(400).json({ message: "Input data not found" });

    const { title, description, category, assignedTo, status } = req.body;

    const user = await userModel.findById(req.user._id);

    const newTask = await taskModel.create({
      title,
      description,
      category,
      status,
      assignedTo: assignedTo || null,
      user: req.user._id,
    });

    user.tasks.push(newTask._id);
    await user.save();

    res
      .status(200)
      .json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const taskID = req.params.id;
    const updates = req.body;

    const task = await taskModel.findById(taskID);
    if (!task) return res.status(404).json({ message: "Task not found" });

    const userOwnsTask = String(task.user) === String(req.user._id);
    const isAssignedToUser = String(task.assignedTo) === String(req.user._id);

    if (!userOwnsTask && !isAssignedToUser) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this task" });
    }

    const updatedTask = await taskModel.findByIdAndUpdate(taskID, updates, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ message: "Task updated", task: updatedTask });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Server error" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const taskID = req.params.id;
    const task = await taskModel.findById(taskID);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (String(req.user._id) !== String(task.user)) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this task" });
    }

    await taskModel.findByIdAndDelete(taskID);
    await userModel.findByIdAndUpdate(req.user._id, {
      $pull: { tasks: taskID },
    });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.getAllTasks = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Set default values for page and limit
    const userWithTasks = await userModel.findById(req.user._id).populate({
      path: "tasks",
      options: {
        skip: (page - 1) * limit, // Skip tasks for the previous pages
        limit: Number(limit), // Limit the number of tasks per page
      },
    });

    if (!userWithTasks) {
      return res.status(404).json({ message: "User not found" });
    }

    const totalTasks = userWithTasks.tasks.length; // Get the total number of tasks
    const totalPages = Math.ceil(totalTasks / limit); // Calculate total pages

    res.status(200).json({
      tasks: userWithTasks.tasks,
      currentPage: Number(page),
      totalPages: totalPages,
      totalTasks: totalTasks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getFilteredTasks = async (req, res) => {
  try {
    const { category, status } = req.query;

    const user = await userModel.findById(req.user._id).populate({
      path: "tasks",
      match: {
        ...(category && { category }),
        ...(status && { status }),
      },
    });

    res.status(200).json({
      tasks: user.tasks,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error filtering tasks" });
  }
};

exports.assignTaskToFriend = async (req, res) => {
  try {
    const { taskID, friendId } = req.body;
    const userID = req.user._id;

    if (!taskID || !friendId)
      return res
        .status(404)
        .json({ message: "task id and friend id are required" });

    const user = await userModel.findById(userID);
    const friend = await userModel.findById(friendId);
    const task = await taskModel.findById(taskID);

    if (!user && !friend && task)
      return res
        .status(404)
        .json({ message: "user , friend or task not found" });

    if (task.user.toString() !== userID.toString())
      return res
        .status(403)
        .json({ message: "you can only assign your own task" });
    const areFriends =
      user.friends.includes(friendId) && friend.friends.includes(userID);
    if (!areFriends)
      return res
        .status(403)
        .json({ message: "you can only assign tasks to friends" });

    task.assignedTo = friendId;
    await task.save();
    res.status(200).json({ message: "task assigned successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "server error" });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params; // Task ID
    const { status } = req.body;
    const userId = req.user._id;

    const validStatuses = ["pending", "ongoing", "done", "collaborative"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const task = await taskModel.findById(id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    const isOwner = String(task.user) === String(userId);
    const isAssigned = String(task.assignedTo) === String(userId);

    if (!isOwner && !isAssigned) {
      return res
        .status(403)
        .json({ message: "Not authorized to update status" });
    }

    task.status = status;
    await task.save();

    return res
      .status(200)
      .json({ message: "Status updated successfully", task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
