const { Router } = require("express");
const router = Router();
const MiniDAO = require("../daos/mini");
const UserDAO = require("../daos/user");
const { isLoggedIn } = require("./middleware");

router.get("/:username/minis", async (req, res, next) => {
  try {
    const user = await UserDAO.findUserByUsername(req.params.username);
    if (!user) {
      res.sendStatus(404);
      return;
    }
    const result = await MiniDAO.getMinisByUserId(user._id, req.query);
    res.json(result);
  } catch (e) {
    next(e);
  }
});

router.get("/me", isLoggedIn, async (req, res, next) => {
  try {
    let user = await UserDAO.findUserById(req.userId);
    delete user.password;
    res.json(user);
  } catch (e) {
    next(e);
  }
});

router.get("/:username", async (req, res, next) => {
  try {
    let user = await UserDAO.findUserByUsername(req.params.username);
    if (!user) {
      res.sendStatus(404);
      return;
    }
    delete user.password;
    res.json(user);
  } catch (e) {
    next(e);
  }
});

router.put("/:id", isLoggedIn, async (req, res, next) => {
  try {
    const user = await UserDAO.findUserById(req.userId);
    const userToEdit = await UserDAO.findUserById(req.params.id);
    if (!userToEdit) {
      res.sendStatus(404);
      return;
    }
    if (
      !user.roles.includes("admin") &&
      userToEdit._id.toString() !== req.userId.toString()
    ) {
      res.sendStatus(401);
      return;
    }
    if (!user.roles.includes("admin")) {
      delete req.body.roles;
    }
    let updatedUser = await UserDAO.updateUser(userToEdit._id, req.body);
    updatedUser = updatedUser.toObject();
    delete updatedUser.password;
    res.json(updatedUser);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
