const { Router } = require("express");
const router = Router();

router.use("/auth", require("./auth"));
router.use("/images", require("./images"));
router.use("/invites", require("./invites"));
router.use("/minis", require("./minis"));
router.use("/users/", require("./users"));
router.use("/manufacturers/", require("./manufacturers"));
router.use("/figures/", require("./figures"));

router.use(function (err, req, res, next) {
  if (err.message.includes("Cast to ObjectId failed for value")) {
    res.sendStatus(404);
    return;
  }
  if (err.message.includes("duplicate key error collection")) {
    res.sendStatus(409);
    return;
  }
  if (err.message.includes("validation failed")) {
    res.sendStatus(400);
    return;
  }

  console.error(err);
  res.status(500).send("Something broke!");
});

module.exports = router;
