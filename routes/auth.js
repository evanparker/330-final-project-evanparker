const { Router } = require("express");
const router = Router();
const UserDAO = require("../daos/user");
const TokenDAO = require("../daos/token");
const InviteDAO = require("../daos/invite");
const bcrypt = require("bcrypt");
const { isLoggedIn } = require("./middleware");

router.post("/signup", async (req, res, next) => {
  try {
    let { password, email, username, invite } = req.body;
    const inviteObj = await InviteDAO.getInviteByCode(invite);
    if (password && email && username && inviteObj) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await UserDAO.createUser({
        password: hashedPassword,
        email,
        username,
        roles: ["user"]
      });
      await InviteDAO.deleteInvite(invite);
      res.json(user);
    } else {
      res.sendStatus(400);
    }
  } catch (e) {
    if (e.message.includes("duplicate key error collection")) {
      res.sendStatus(409);
      return;
    } else {
      next(e);
    }
  }
});

router.post("/login", async (req, res, next) => {
  try {
    let { password, email } = req.body;
    if (!password) {
      res.status(400);
      res.json();
      return;
    }
    const user = await UserDAO.findUserByEmail(email);
    if (!user) {
      res.status(401);
      res.json();
      return;
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const token = await TokenDAO.makeTokenForUserId(user._id);
      res.json(token);
    } else {
      res.status(401);
      res.json();
      return;
    }
  } catch (e) {
    next(e);
  }
});

router.put("/password", isLoggedIn, async (req, res, next) => {
  try {
    let { password } = req.body;
    let userId = req.userId;
    if (!password) {
      res.status(400);
      res.json();
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await UserDAO.updateUserPassword(
      userId,
      hashedPassword
    );
    res.json(updatedUser);
  } catch (e) {
    next(e);
  }
});

router.post("/logout", isLoggedIn, async (req, res, next) => {
  try {
    const token = await TokenDAO.removeToken(req.tokenString);
    if (token) {
      res.json(token);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
