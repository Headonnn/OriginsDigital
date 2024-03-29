const AbstractManager = require("./AbstractManager");

class VideoManager extends AbstractManager {
  constructor() {
    super({ table: "video" });
  }

  get(id) {
    const category = parseInt(id, 10);
    return this.database
      .query(
        `SELECT ${this.table}.id, title, url, description, thumbnail, date, is_freemium, is_in_hero FROM ${this.table}
        INNER JOIN video_category ON video_id = ${this.table}.id 
        INNER JOIN category ON category_id = category.id
        WHERE category.id = ?`,
        [category]
      )
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to retrieve data from the database.");
      });
  }

  insert(video) {
    const {
      title,
      url,
      description,
      thumbnail,
      length,
      is_freemium: isFreemium,
      is_in_hero: isInHero,
    } = video;

    return this.database.query(
      `INSERT INTO ${this.table} (title, url, description, thumbnail, date, length, is_freemium, is_in_hero) VALUES (?, ?, ?, ?, CURDATE(), ?, ?, ?)`,
      [title, url, description, thumbnail, length, isFreemium, isInHero]
    );
  }

  update(video) {
    const {
      id,
      title,
      url,
      description,
      thumbnail,
      date,
      length,
      is_freemium: isFreemium,
      is_in_hero: isInHero,
    } = video;

    return this.database.query(
      `UPDATE ${this.table} SET title=?, url=?, description=?, thumbnail=?, date=?, length=?, is_freemium=?, is_in_hero=? WHERE id=?`,
      [
        title,
        url,
        description,
        thumbnail,
        date,
        length,
        isFreemium,
        isInHero,
        id,
      ]
    );
  }

  updateFreemium(video) {
    const { isFreemium, id } = video;

    return this.database.query(
      `UPDATE  ${this.table} SET is_freemium = ? WHERE id = ?`,
      [isFreemium, id]
    );
  }

  updateHero(video) {
    const { isHero, id } = video;

    return this.database.query(
      `UPDATE  ${this.table} SET is_in_hero = ? WHERE id = ?`,
      [isHero, id]
    );
  }

  isFreemium() {
    return this.database
      .query(`SELECT * FROM ${this.table} WHERE is_freemium= 1`)
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to retrieve data from the database.");
      });
  }
}

module.exports = VideoManager;
