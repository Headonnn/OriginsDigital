const AbstractManager = require("./AbstractManager");

class VideoManager extends AbstractManager {
  constructor() {
    super({ table: "video" });
  }

  insert(video) {
    const {
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
      `INSERT INTO ${this.table} (title, url, description, thumbnail, date, length, is_freemium, is_in_hero) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, url, description, thumbnail, date, length, isFreemium, isInHero]
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
}

module.exports = VideoManager;
