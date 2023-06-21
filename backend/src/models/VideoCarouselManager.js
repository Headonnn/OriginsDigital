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
}

module.exports = VideoCarouselManager;
