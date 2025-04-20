module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    return db.collection("users").updateMany(
      {},
      {
        $set: {
          favorites: {}
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
    return db.collection("users").updateMany(
      {},
      {
        $unset: {
          favorites: null
        }
      }
    );
  }
};
