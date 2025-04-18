const { Router } = require("express");
const router = Router();
const MiniDAO = require("../daos/mini");
const ImageDAO = require("../daos/image");
const UserDAO = require("../daos/user");
const { isLoggedIn } = require("./middleware");

router.get("/", async (req, res, next) => {
  try {
    const result = await MiniDAO.getAllMinis(req.query);
    res.json(result);
  } catch (e) {
    next(e);
  }
});

router.get("/search", async (req, res, next) => {
  try {
    const results = await MiniDAO.getMinisBySearch(req.query);
    res.json(results);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const mini = await MiniDAO.getMiniById(req.params.id);

    if (!mini) {
      res.status(404).json({ message: "Mini not found" });
      return;
    }

    res.json(mini);
  } catch (e) {
    next(e);
  }
});

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const imageIds = req.body.images;
    const images = await ImageDAO.getImagesByIds(imageIds);
    if (images.length !== imageIds.length) {
      res.status(400).json({ message: "Linked images not found" });
      return;
    }

    const mini = await MiniDAO.createMini({
      ...req.body,
      userId: req.userId
    });
    res.json(mini);
  } catch (e) {
    next(e);
  }
});

router.put("/:id", isLoggedIn, async (req, res, next) => {
  try {
    const mini = await MiniDAO.getMiniById(req.params.id);
    const user = await UserDAO.findUserById(req.userId);
    if (
      !user.roles.includes("admin") &&
      mini.userId._id.toString() !== req.userId.toString()
    ) {
      res.sendStatus(401);
      return;
    }
    const updatedMini = await MiniDAO.updateMini(req.params.id, req.body);
    res.json(updatedMini);
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", isLoggedIn, async (req, res, next) => {
  try {
    const mini = await MiniDAO.getMiniById(req.params.id);
    const user = await UserDAO.findUserById(req.userId);
    if (
      !user?.roles?.includes("admin") &&
      mini?.userId._id.toString() !== req.userId.toString()
    ) {
      res.sendStatus(401);
      return;
    }

    const deletedMini = await MiniDAO.deleteMini(req.params.id);
    res.json(deletedMini);
  } catch (e) {
    next(e);
  }
});
module.exports = router;
