const AbstractManager = require("./AbstractManager");

class VideoCarouselManager extends AbstractManager {
  constructor() {
    super({ table: "video_carousel" });
  }

  findCarId(id) {
    return this.database
      .query(`SELECT video_id from ${this.table} WHERE carousel_id=?`, [id])
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to retrieve data from the database.");
      });
  }

  insert(ids) {
    const { videoId, carouselId } = ids;
    return this.database
      .query(`INSERT INTO ${this.table} (video_id,carousel_id)VALUES (?,?)`, [
        videoId,
        carouselId,
      ])
      .catch((error) => {
        console.error(error);
        throw new Error("Erreur en inserant un couple video_id carousel_id");
      });
  }

  delete(id) {
    return this.database
      .query(`DELETE FROM ${this.table} WHERE carousel_id = ?`, [id])
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to delete data from the database.");
      });
  }
}

module.exports = VideoCarouselManager;
