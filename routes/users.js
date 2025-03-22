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
    let minis;
    if (req.query.thumbnails) {
      minis = await MiniDAO.getMinisByUserIdWithThumbnails(user._id);
    } else {
      minis = await MiniDAO.getMinisByUserId(user._id);
    }
    res.json(minis);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
