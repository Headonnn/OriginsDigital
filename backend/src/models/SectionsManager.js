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
}
module.exports = SectionsManager;
