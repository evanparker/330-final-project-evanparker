module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    return db.collection("minis").updateMany(
      {},
      {
        $set: {
          isDeleted: false,
          blur: false
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
          isDeleted: null,
          blur: null
        }
      }
    );
  }
};
