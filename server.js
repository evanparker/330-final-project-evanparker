const express = require("express");
const cors = require("cors");

const routes = require("./routes");
const fileUpload = require("express-fileupload");

const server = express();
// enabling CORS for any unknown origin(https://xyz.example.com)
server.use(cors());
server.use(express.json());
server.use(fileUpload());

server.use(routes);

module.exports = server;
