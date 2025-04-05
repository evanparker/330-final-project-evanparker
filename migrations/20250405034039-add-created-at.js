module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
    await db.collection("users").updateMany(
      {},
      {
        $set: {
          createdAt: new Date(Date.now())
        }
      }
    );

    await db.collection("figures").updateMany(
      {},
      {
        $set: {
          createdAt: new Date(Date.now())
        }
      }
    );
    await db.collection("images").updateMany(
      {},
      {
        $set: {
          createdAt: new Date(Date.now())
        }
      }
    );
    await db.collection("invites").updateMany(
      {},
      {
        $set: {
          createdAt: new Date(Date.now())
        }
      }
    );
    await db.collection("manufacturers").updateMany(
      {},
      {
        $set: {
          createdAt: new Date(Date.now())
        }
      }
    );
    await db.collection("minis").updateMany(
      {},
      {
        $set: {
          createdAt: new Date(Date.now())
        }
      }
    );
    await db.collection("tokens").updateMany(
      {},
      {
        $set: {
          createdAt: new Date(Date.now())
        }
      }
    );
  },

  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async down(db, client) {
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});

    await db.collection("users").updateMany(
      {},
      {
        $unset: {
          createdAt: null
        }
      }
    );
    await db.collection("figures").updateMany(
      {},
      {
        $unset: {
          createdAt: null
        }
      }
    );
    await db.collection("images").updateMany(
      {},
      {
        $unset: {
          createdAt: null
        }
      }
    );
    await db.collection("invites").updateMany(
      {},
      {
        $unset: {
          createdAt: null
        }
      }
    );
    await db.collection("manufacturers").updateMany(
      {},
      {
        $unset: {
          createdAt: null
        }
      }
    );
    await db.collection("minis").updateMany(
      {},
      {
        $unset: {
          createdAt: null
        }
      }
    );
    await db.collection("tokens").updateMany(
      {},
      {
        $unset: {
          createdAt: null
        }
      }
    );
  }
};
