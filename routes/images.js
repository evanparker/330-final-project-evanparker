const { Router } = require("express");
const router = Router();
const ImageDAO = require("../daos/image");
const { isLoggedIn } = require("./middleware");
const { UploadFile } = require("../utils/files/uploadFile");
const { config } = require("../utils/config");

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    if (req.files?.file) {
      const file = req.files.file;
      const newFilename = `image_${Date.now().toString()}.${file.mimetype.split("/")[1]}`;
      const result = await UploadFile({
        bucketName: config.aws.bucket,
        key: newFilename,
        data: file.data
      });

      if (result) {
        const imageObj = {
          s3Key: newFilename,
          s3Bucket: config.aws.bucket,
          type: "s3Image",
          userId: req.userId
        };
        const image = await ImageDAO.createImage(imageObj);
        res.json(image);
      } else {
        throw new Error("error uploading to s3");
      }
    } else {
      throw new Error("file required");
    }
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
