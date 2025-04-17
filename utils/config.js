const dotenv = require("dotenv");

dotenv.config();

module.exports = {};
module.exports.config = {
  aws: {
    bucket: process.env["AWS_S3_BUCKET"],
    region: process.env["AWS_REGION"],
    accessKey: process.env["AWS_ACCESS_KEY_ID"],
    secretKey: process.env["AWS_SECRET_ACCESS_KEY"]
  }
};
