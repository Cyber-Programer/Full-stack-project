const userModel = require("../models/userModel");

// Send Friend Request
exports.sendFriendRequest = async (req, res) => {
  try {
    const { toUserId } = req.body;
    const fromUserId = req.user._id;

    if (!toUserId) {
      return res.status(400).json({ message: "Target user ID is required" });
    }

    if (fromUserId.toString() === toUserId) {
      return res
        .status(400)
        .json({ message: "You can't send a request to yourself" });
    }

    const fromUser = await userModel.findById(fromUserId);
    const toUser = await userModel.findById(toUserId);

    if (!toUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const alreadyRequested =
      fromUser.friends.includes(toUserId) ||
      fromUser.sentRequests.includes(toUserId) ||
      toUser.pendingRequests.includes(fromUserId);

    if (alreadyRequested) {
      return res
        .status(400)
        .json({ message: "Request already sent or you're already friends" });
    }

    fromUser.sentRequests.push(toUserId);
    toUser.pendingRequests.push(fromUserId);

    await fromUser.save();
    await toUser.save();

    res.status(200).json({ message: "Friend request sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Accept or Reject Friend Request
exports.responseToFriendRequest = async (req, res) => {
  try {
    const { fromUserId, action } = req.body;
    const toUserId = req.user._id;
    if (fromUserId == String(toUserId))
      return res
        .status(400)
        .json({ message: "you are not authorized to accept the request" });

    if (!fromUserId || !action) {
      return res.status(400).json({ message: "Missing data in request" });
    }

    const act = action.toLowerCase();
    if (!["accept", "reject"].includes(act)) {
      return res.status(400).json({ message: "Invalid action" });
    }

    const toUser = await userModel.findById(toUserId);
    const fromUser = await userModel.findById(fromUserId);

    if (!toUser || !fromUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPending = toUser.pendingRequests.some(
      (id) => id.toString() === fromUserId.toString()
    );
    const isSent = fromUser.sentRequests.some(
      (id) => id.toString() === toUserId.toString()
    );

    if (!isPending || !isSent) {
      return res.status(400).json({ message: "No friend request found" });
    }

    if (act === "accept") {
      // Add each other as friends
      toUser.friends.push(fromUserId);
      fromUser.friends.push(toUserId);
    }

    // Remove request references
    toUser.pendingRequests = toUser.pendingRequests.filter(
      (id) => id.toString() !== fromUserId.toString()
    );
    fromUser.sentRequests = fromUser.sentRequests.filter(
      (id) => id.toString() !== toUserId.toString()
    );

    await toUser.save();
    await fromUser.save();

    res.status(200).json({ message: `Request ${act}ed successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.removeFriend = async (req, res) => {
    try {
      const { friendId } = req.body;
      const userId = req.user._id;
  
      if (!friendId)
        return res.status(400).json({ message: "Friend ID is required" });
  
      if (friendId === String(userId))
        return res
          .status(400)
          .json({ message: "You can't remove yourself from your friend list" });
  
      const user = await userModel.findById(userId);
      const friend = await userModel.findById(friendId);
  
      if (!user || !friend)
        return res.status(404).json({ message: "User not found" });
  
      const areFriends =
        user.friends.includes(friendId) &&
        friend.friends.includes(userId.toString());
  
      if (!areFriends)
        return res.status(400).json({ message: "Users are not friends" });
  
      // Remove each other
      user.friends = user.friends.filter((id) => id.toString() !== friendId);
      friend.friends = friend.friends.filter(
        (id) => id.toString() !== userId.toString()
      );
  
      await user.save();
      await friend.save();
  
      return res.status(200).json({ message: "Friend removed successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server error" });
    }
  };
  