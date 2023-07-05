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

  findCatName(id) {
    return this.database
      .query(
        `SELECT name from category INNER join ${this.table} ON category.id =${this.table}.category_id WHERE ${this.table}.id = ?`,
        [id]
      )
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to retrieve data from the database.");
      });
  }
}

module.exports = CarouselCategoryManager;
