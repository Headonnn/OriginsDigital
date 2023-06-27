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
}
module.exports = SectionsManager;
