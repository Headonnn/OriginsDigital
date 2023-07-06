const AbstractManager = require("./AbstractManager");

class VideoCategoryManager extends AbstractManager {
  constructor() {
    super({ table: "video_category" });
  }

  findAllFromVid(id) {
    return this.database
      .query(
        `SELECT video_id, category_id, name from ${this.table} INNER JOIN category ON category_id=category.id WHERE video_id  =?`,
        [id]
      )
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to retrieve data from the database.");
      });
  }

  findCatId(id) {
    return this.database
      .query(`SELECT video_id from ${this.table} WHERE category_id  =?`, [id])
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to retrieve data from the database.");
      });
  }

  findCatName(id) {
    return this.database
      .query(
        `SELECT name from category INNER JOIN ${this.table} ON  ${this.table}.category_id =category.id WHERE category.id = ?`,
        [id]
      )
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to retrieve data from the database.");
      });
  }

  insert(vidCat) {
    const { categoryId, videoId } = vidCat;
    return this.database
      .query(`INSERT INTO ${this.table} (video_id, category_id) VALUES (?,?)`, [
        videoId,
        categoryId,
      ])
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to retrieve data from the database.");
      });
  }
}

module.exports = VideoCategoryManager;
