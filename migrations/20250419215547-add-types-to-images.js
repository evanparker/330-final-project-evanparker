module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script

    const operations = [];

    const images = await db.collection("images").find({ type: null }).toArray();
    for (const image of images) {
      if (!image.type) {
        let type = "urlImage";
        if (image.cloudinaryPublicId) {
          type = "cloudinaryImage";
        } else if (image.s3Key) {
          type = "s3Image";
        }

        operations.push(
          db.collection("images").findOneAndUpdate(
            { _id: image._id },
            {
              $set: {
                type
              }
            }
          )
        );
      }
    }

    return Promise.all(operations);
  },

  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async down(db, client) {
    const operations = [];

    operations.push(
      db.collection("images").updateMany(
        {},
        {
          $unset: {
            type: null
          }
        }
      )
    );

    return Promise.all(operations);
  }
};
