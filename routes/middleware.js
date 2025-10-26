const TokenDAO = require("../daos/token");
const UserDAO = require("../daos/user");

module.exports = {};

module.exports.isLoggedIn = async (req, res, next) => {
  try {
    let tokenString = req.headers.authorization;
    if (typeof tokenString === "string") {
      tokenString = tokenString.slice(7); // "remove 'Bearer '"
      req.tokenString = tokenString;
    }
    const userId = await TokenDAO.getUserIdFromToken(tokenString);
    if (userId) {
      req.userId = userId;
      next();
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    next(e);
  }
};

module.exports.isAdmin = async (req, res, next) => {
  try {
    const user = await UserDAO.findUserById(req.userId);
    if (user.roles.includes("admin")) {
      next();
      return true;
    } else {
      res.sendStatus(403);
      return false;
    }
  } catch (e) {
    next(e);
  }
};

module.exports.skip = async (req, res, next) => {
  try {
    next();
  } catch (e) {
    next(e);
  }
};
