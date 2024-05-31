const { Router } = require("express");
const router = Router();
const ImageDAO = require("../daos/image");
const { isLoggedIn } = require("./middleware");

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const imageObj = { ...req.body, userId: req.userId };
    const image = await ImageDAO.createImage(imageObj);
    res.json(image);
  } catch (e) {
    if (e.message.includes("validation failed")) {
      res.sendStatus(400);
    } else {
      next(e);
    }
  }
});

module.exports = router;
