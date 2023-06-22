const AbstractManager = require("./AbstractManager");

class CarouselCategoryManager extends AbstractManager {
  constructor() {
    super({ table: "carousel_category" });
  }
}

module.exports = CarouselCategoryManager;
