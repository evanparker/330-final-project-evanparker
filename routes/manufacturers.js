const { Router } = require("express");
const router = Router();
const FigureDAO = require("../daos/figure");
const ManufacturerDAO = require("../daos/manufacturer");
const { isLoggedIn, isAdmin } = require("./middleware");

router.get("/", async (req, res, next) => {
  try {
    const manufacturers = await ManufacturerDAO.getAllManufacturers();
    res.json(manufacturers);
  } catch (e) {
    next(e);
  }
});

router.get("/search", async (req, res, next) => {
  try {
    const manufacturers = await ManufacturerDAO.getManufacturersBySearch(
      req.query.query
    );
    res.json(manufacturers);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const manufacturer = await ManufacturerDAO.getManufacturerById(
      req.params.id
    );
    res.json(manufacturer);
  } catch (e) {
    next(e);
  }
});

router.get("/:id/figures", async (req, res, next) => {
  try {
    const minis = await FigureDAO.getFiguresBymanufacturerIdWithThumbnails(
      req.params.id
    );
    res.json(minis);
  } catch (e) {
    next(e);
  }
});

router.post("/", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const manufacturer = await ManufacturerDAO.createManufacturer(req.body);
    res.json(manufacturer);
  } catch (e) {
    next(e);
  }
});

router.put("/:id", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const updatedManufacturer = await ManufacturerDAO.updateManufacturer(
      req.params.id,
      req.body
    );
    res.json(updatedManufacturer);
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const deletedManufacturer = await ManufacturerDAO.deleteManufacturer(
      req.params.id
    );
    res.json(deletedManufacturer);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
