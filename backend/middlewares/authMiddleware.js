const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

// it's ck token is valid or not and usr is available or not \\
const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res
        .status(401)
        .json({ message: "not authorized, no token found" });
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decode.id).select("-password");
    if (!req.user) return res.status(401).json({ message: "user not found" });
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "not authorized" });
  }
};

// it's ck token is valid or not and usr is available or not \\
// if login and token valid then redirect to dashboard page \\
const redirectIfAuthenticated = async (req, res, next) => {
  try {
    console.log(req.cookies);
    const token = req.cookies.token;
    if (!token)
      return res
        .status(401)
        .json({ authenticated: false,message: "not authorized, no token found" });
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decode.id).select("-password");
    if (!req.user) return res.status(401).json({ message: "user not found" });
    return res
      .status(200)
      .json({ authenticated: true, redirect: "/dashboard" });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "not authorized" });
  }
};

module.exports = { protect, redirectIfAuthenticated };
