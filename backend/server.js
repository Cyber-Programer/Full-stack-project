const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(port, () => {
      console.log("server is running on port: ", port);
    });
  })
  .catch((err) => {
    console.log("DB connection Error: ", err);
  });
