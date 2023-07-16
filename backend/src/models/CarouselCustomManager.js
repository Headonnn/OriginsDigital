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

  update(carousel) {
    const { name, id } = carousel;

    return this.database.query(`UPDATE ${this.table} SET name=? WHERE id=?`, [
      name,
      id,
    ]);
  }
}

module.exports = CarouselCustomManager;
