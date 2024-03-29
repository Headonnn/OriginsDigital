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

  updateVis(section) {
    const { id, visibility } = section;
    return this.database
      .query(`UPDATE ${this.table} SET visibility=? WHERE id=?`, [
        visibility,
        id,
      ])
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to edit order from section.");
      });
  }

  insertcustom(custom) {
    console.warn(custom);

    const { ordre, carouselCustomId, title, visibility } = custom;

    return this.database.query(
      `INSERT INTO ${this.table} (carousel_custom_id, ordre,title,visibility) VALUES (?,?,?,?)`,
      [carouselCustomId, ordre, title, visibility]
    );
  }

  insertcategory(category) {
    console.warn(category);

    const { ordre, carouselCategoryId, title, visibility } = category;

    return this.database.query(
      `INSERT INTO ${this.table} (carousel_category_id, ordre,title,visibility) VALUES (?,?,?,?)`,
      [carouselCategoryId, ordre, title, visibility]
    );
  }
}
module.exports = SectionsManager;
