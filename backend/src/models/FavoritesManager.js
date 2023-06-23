const AbstractManager = require("./AbstractManager");

class FavoritesManager extends AbstractManager {
  constructor() {
    super({ table: "favorite" });
  }

  add(fav) {
    const { userId, videoId } = fav;

    return this.database.query(
      `INSERT INTO ${this.table} (user_id,video_id) VALUES (?, ?)`,
      [userId, videoId]
    );
  }

  destroy(fav) {
    const { userId, videoId } = fav;
    console.warn(fav);
    return this.database.query(
      `DELETE FROM ${this.table} WHERE user_id = ? and video_id = ?`,
      [userId, videoId]
    );
  }

  findByUser(id) {
    return this.database
      .query(`SELECT video_id from ${this.table} WHERE user_id=?`, [id])
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to retrieve data from the database.");
      });
  }
}

module.exports = FavoritesManager;
