const AbstractManager = require("./AbstractManager");

class CategoryManager extends AbstractManager {
  constructor() {
    super({ table: "category" });
  }

  insert(category) {
    const { name } = category;

    return this.database.query(
      `INSERT INTO ${this.table} (name) VALUES ("${name}")`
    );
  }

  update(category) {
    const { id } = category;
    const { name } = category;

    return this.database.query(
      `UPDATE ${this.table} SET name="${name}" WHERE id=${id})`
    );
  }
}

module.exports = CategoryManager;
