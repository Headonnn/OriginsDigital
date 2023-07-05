const AbstractManager = require("./AbstractManager");

class CarouselCategoryManager extends AbstractManager {
  constructor() {
    super({ table: "carousel_category" });
  }

  insert(carousel) {
    const { maxNumber, category } = carousel;

    return this.database.query(
      `INSERT INTO ${this.table} (max_number,category_id) VALUES (?,?)`,
      [maxNumber, category]
    );
  }
}

module.exports = CarouselCategoryManager;
