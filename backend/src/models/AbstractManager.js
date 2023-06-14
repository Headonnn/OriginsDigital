class AbstractManager {
  constructor({ table }) {
    this.table = table;
  }

  find(id) {
    return this.database
      .query(`SELECT * FROM ${this.table} WHERE id = ?`, [id])
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to retrieve data from the database.");
      });
  }

  findAll() {
    return this.database.query(`SELECT * FROM ${this.table}`).catch((error) => {
      console.error(error);
      throw new Error("Failed to retrieve data from the database.");
    });
  }

  delete(id) {
    return this.database
      .query(`DELETE FROM ${this.table} WHERE id = ?`, [id])
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to delete data from the database.");
      });
  }

  setDatabase(database) {
    this.database = database;
  }
}

module.exports = AbstractManager;
