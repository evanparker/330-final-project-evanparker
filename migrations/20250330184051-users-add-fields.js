module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    // TODO write your migration here.
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
    // TODO write the statements to rollback your migration (if possible)
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
