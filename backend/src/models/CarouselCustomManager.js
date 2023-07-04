const AbstractManager = require("./AbstractManager");

class CarouselCustomManager extends AbstractManager {
  constructor() {
    super({ table: "carousel_custom" });
  }

  insert(carousel) {
    const { name } = carousel;

    return this.database.query(`INSERT INTO ${this.table} (name) VALUES (?)`, [
      name,
    ]);
  }
}

module.exports = CarouselCustomManager;
