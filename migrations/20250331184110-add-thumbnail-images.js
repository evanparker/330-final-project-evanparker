module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script

    const operations = [];

    const minis = await db.collection("minis").find({}).toArray();
    for (const mini of minis) {
      const image = mini.images[0];
      operations.push(
        db.collection("minis").findOneAndUpdate(
          { _id: mini._id },
          {
            $set: {
              thumbnail: image
            }
          }
        )
      );
    }

    const figures = await db.collection("figures").find({}).toArray();
    for (const figure of figures) {
      const image = figure.images[0];
      operations.push(
        db.collection("figures").findOneAndUpdate(
          { _id: figure._id },
          {
            $set: {
              thumbnail: image
            }
          }
        )
      );
    }

    const manufacturers = await db
      .collection("manufacturers")
      .find({})
      .toArray();
    for (const manufacturer of manufacturers) {
      const image = manufacturer.images[0];
      operations.push(
        db.collection("manufacturers").findOneAndUpdate(
          { _id: manufacturer._id },
          {
            $set: {
              thumbnail: image
            }
          }
        )
      );
    }

    return Promise.all(operations);
  },

  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)

    const operations = [];

    operations.push(
      db.collection("minis").updateMany(
        {},
        {
          $unset: {
            thumbnail: null
          }
        }
      )
    );
    operations.push(
      db.collection("figures").updateMany(
        {},
        {
          $unset: {
            thumbnail: null
          }
        }
      )
    );
    operations.push(
      db.collection("manufacturers").updateMany(
        {},
        {
          $unset: {
            thumbnail: null
          }
        }
      )
    );
    return Promise.all(operations);
  }
};
