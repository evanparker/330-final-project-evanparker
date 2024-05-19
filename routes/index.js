const { Router } = require("express");
const router = Router();

router.use("/auth", require('./auth'));

router.use(function (err, req, res, next) {
  if (err.message.includes("Cast to ObjectId failed")) {
    res.status(400).send('Invalid id provided');
  } else {
    console.error(err);
    res.status(500).send('Something broke!')
  }
});

module.exports = router;