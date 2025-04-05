module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    await db.collection("figures").updateMany(
      {},
      {
        $set: {
          website: "",
          description: "",
          partNumber: ""
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
    await db.collection("figures").updateMany(
      {},
      {
        $unset: {
          website: null,
          description: null,
          partNumber: null
        }
      }
    );
  }
};
