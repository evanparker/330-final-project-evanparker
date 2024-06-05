const { Router } = require("express");
const router = Router();
const MiniDAO = require("../daos/mini");
const UserDAO = require("../daos/user");

router.get("/:username/minis", async (req, res, next) => {
  try {
    const user = await UserDAO.findUserByUsername(req.params.username);
    if (!user) {
      res.sendStatus(404);
      return;
    }
    const minis = await MiniDAO.getMinisByUserId(user._id);
    res.json(minis);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
