const AbstractManager = require("./AbstractManager");

class SectionsManager extends AbstractManager {
  constructor() {
    super({ table: "section" });
  }

  findAllOrdered() {
    return this.database
      .query(`SELECT * FROM ${this.table} ORDER BY ${this.table}.ordre`)
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to retrieve data from the database.");
      });
  }

  update(section) {
    const { id, ordre } = section;
    return this.database
      .query(`UPDATE ${this.table} SET ordre=? WHERE id=?`, [ordre, id])
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to edit order from section.");
      });
  }

  insertcustom(custom) {
    console.warn(custom);

    const { ordre, carouselCustomId, title } = custom;

    return this.database.query(
      `INSERT INTO ${this.table} (carousel_custom_id, ordre,title) VALUES (?,?,?)`,
      [carouselCustomId, ordre, title]
    );
  }

  insertcategory(category) {
    console.warn(category);

    const { ordre, carouselCategoryId, title } = category;

    return this.database.query(
      `INSERT INTO ${this.table} (carousel_category_id, ordre,title) VALUES (?,?,?)`,
      [carouselCategoryId, ordre, title]
    );
  }
}
module.exports = SectionsManager;
