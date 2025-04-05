const { Router } = require("express");
const router = Router();
const MiniDAO = require("../daos/mini");
const FigureDAO = require("../daos/figure");
const ImageDAO = require("../daos/image");
const UserDAO = require("../daos/user");
const { isLoggedIn, isAdmin } = require("./middleware");

router.get("/", async (req, res, next) => {
  try {
    const figures = await FigureDAO.getAllFigures(req.query);
    res.json(figures);
  } catch (e) {
    next(e);
  }
});

router.get("/search", async (req, res, next) => {
  try {
    const figures = await FigureDAO.getFiguresBySearch(req.query);
    res.json(figures);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const figure = await FigureDAO.getFigureById(req.params.id);
    res.json(figure);
  } catch (e) {
    next(e);
  }
});

router.get("/:id/minis", async (req, res, next) => {
  try {
    const result = await MiniDAO.getMinisByFigureId(req.params.id, req.query);
    res.json(result);
  } catch (e) {
    next(e);
  }
});

router.post("/", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const figure = await FigureDAO.createFigure(req.body);
    res.json(figure);
  } catch (e) {
    next(e);
  }
});

router.put("/:id", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const updatedFigure = await FigureDAO.updateFigure(req.params.id, req.body);
    res.json(updatedFigure);
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const deletedFigure = await FigureDAO.deleteFigure(req.params.id);
    res.json(deletedFigure);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
