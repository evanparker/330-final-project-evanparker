module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    return db.collection("minis").updateMany(
      {},
      {
        $set: {
          favorites: 0
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
    return db.collection("minis").updateMany(
      {},
      {
        $unset: {
          favorites: null
        }
      }
    );
  }
};
