const User = require("../models/userModel");
const Tweet = require("../models/tweetModel");
const asyncHandler = require("express-async-handler");
const Notification = require("../models/notificationModel");

// @desc Get informations for dashboard
// @route GET /api/dashboard
// @access Private + Admin
const dashBoardData = asyncHandler(async (req, res) => {
  const userCount = await User.countDocuments({});
  const tweetCount = await Tweet.countDocuments({});
  const latestUsers = await User.find({}).limit(5).sort({ createdAt: -1 });
  const notifications = await Notification.find({})
    .populate("sender", "id name username image isAdmin isVerified")
    .populate("receiver", "id name username image isAdmin isVerified")
    .sort({ createdAt: -1 });
  res.json({ userCount, tweetCount, latestUsers, notifications });
  res.json({ userCount,tweetCount,latestUsers});
});

module.exports = {
  dashBoardData,
};
