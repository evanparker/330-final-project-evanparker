const { Router } = require("express");
const router = Router();
const MiniDAO = require("../daos/mini");

router.get("/:id/minis", async (req, res, next) => {
  try {
    const minis = await MiniDAO.getMinisByUserId(req.params.id);
    res.json(minis);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
