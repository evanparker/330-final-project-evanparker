const server = require("./server");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const port = process.env.PORT || 3001;
const mongoURL =
  process.env.DB_URL || "mongodb://127.0.0.1/every-mini-painted-cloudinary";

mongoose.connect(mongoURL, {}).then(() => {
  server.listen(port, "::", () => {
    console.log(`Server is listening on http://localhost:${port}`);
  });
});
