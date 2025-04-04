module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    await db.collection("users").updateMany(
      {},
      {
        $set: {
          website: "",
          description: "",
          socials: []
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
    await db.collection("users").updateMany(
      {},
      {
        $unset: {
          website: null,
          description: null,
          socials: null
        }
      }
    );
  }
};
