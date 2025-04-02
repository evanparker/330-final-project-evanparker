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
    next(e);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const images = await ImageDAO.getAllImages();
    res.json(images);
  } catch (e) {
    next(e);
  }
});
module.exports = router;
