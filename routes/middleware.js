const TokenDAO = require("../daos/token");

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
