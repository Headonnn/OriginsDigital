const AbstractManager = require("./AbstractManager");

class CarouselCustomManager extends AbstractManager {
  constructor() {
    super({ table: "carousel_custom" });
  }
}

module.exports = CarouselCustomManager;
