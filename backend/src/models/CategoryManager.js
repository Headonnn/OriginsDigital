const AbstractManager = require("./AbstractManager");

class CategoryManager extends AbstractManager {
  constructor() {
    super({ table: "category" });
  }

  insert(category) {
    const { name } = category;

    return this.database.query(`INSERT INTO ${this.table} (name) VALUES (?)`, [
      name,
    ]);
  }

  update(category) {
    const { id } = category;
    const { name } = category;

    return this.database.query(`UPDATE ${this.table} SET name=? WHERE id=?`, [
      name,
      id,
    ]);
  }
}

module.exports = CategoryManager;
