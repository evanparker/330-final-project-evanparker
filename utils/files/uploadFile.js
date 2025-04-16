const {
  PutObjectCommand,
  S3Client,
  S3ServiceException
} = require("@aws-sdk/client-s3");
const { config } = require("../config");

module.exports = {};

/**
 * Upload a file to an S3 bucket.
 * @param {{ bucketName: string, key: string, data: any }}
 */
module.exports.UploadFile = async ({ bucketName, key, data }) => {
  const client = new S3Client({
    accessKeyId: config.aws.accessKey,
    secretAccessKey: config.aws.secretKey
  });
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: data
  });

  try {
    const response = await client.send(command);
    return response;
  } catch (caught) {
    if (
      caught instanceof S3ServiceException &&
      caught.name === "EntityTooLarge"
    ) {
      console.error(
        `Error from S3 while uploading object to ${bucketName}. \
The object was too large. To upload objects larger than 5GB, use the S3 console (160GB max) \
or the multipart upload API (5TB max).`
      );
    } else if (caught instanceof S3ServiceException) {
      console.error(
        `Error from S3 while uploading object to ${bucketName}.  ${caught.name}: ${caught.message}`
      );
    } else {
      throw caught;
    }
  }
};
