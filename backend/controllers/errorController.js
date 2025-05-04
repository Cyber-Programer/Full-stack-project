exports.handleNotFound = (req, res, next) => {
  res.status(404).json({
    message: `Route ${req.originalUrl} not found`,
  });
};

exports.globalErrorHandler = (err, req, res, next) => {
  console.error("🔥 Error:", err.stack || err.message);

  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
};
