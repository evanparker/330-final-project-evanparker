const { Router } = require("express");
const router = Router();

router.use("/auth", require("./auth"));
router.use("/images", require("./images"));
router.use("/minis", require("./minis"));
router.use("/users/", require("./users"));

router.use(function (err, req, res, next) {
  console.error(err);
  res.status(500).send("Something broke!");
});

module.exports = router;
