const { Router } = require("express");
const router = Router();
const InviteDAO = require("../daos/invite");
const { isLoggedIn, isAdmin } = require("./middleware");

router.post("/", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const inviteObj = req.body;
    const invite = await InviteDAO.createInvite(inviteObj);
    res.json(invite);
  } catch (e) {
    next(e);
  }
});

router.get("/:code", async (req, res, next) => {
  try {
    const invite = await InviteDAO.getInviteByCode(req.params.code);
    if (!invite) {
      res.sendStatus(404);
      return;
    }
    res.json(invite);
  } catch (e) {
    next(e);
  }
});

router.delete("/:code", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const invite = await InviteDAO.deleteInvite(req.params.code);
    if (!invite) {
      res.sendStatus(404);
      return;
    }
    res.json(invite);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
