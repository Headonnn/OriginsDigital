const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(user) {
    const { email, hashedPassword, firstname, lastname, id } = user;

    return this.database.query(
      `INSERT INTO ${this.table} (email, hashedPassword, firstname, lastname, id) VALUES (?, ?, ?, ?, ?)`,
      [email, hashedPassword, firstname, lastname, id]
    );
  }

  updateAll(user) {
    const { firstname, email, id } = user;

    return this.database.query(
      `UPDATE ${this.table} SET firstname=?, email=? WHERE id=?`,
      [firstname, email, id]
    );
  }

  modifyUser(user) {
    const { firstname, email, id } = user;

    return this.database.query(
      `UPDATE ${this.table} SET firstname=?, email=? WHERE id=?`,
      [firstname, email, id]
    );
  }

  update(user) {
    const { id, isAdmin } = user;

    return this.database.query(
      `UPDATE ${this.table} SET is_admin=? WHERE id=?`,
      [isAdmin, id]
    );
  }

  findByMail(email) {
    return this.database
      .query(`SELECT * FROM ${this.table} WHERE email = ?`, [email])
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to retrieve data from the database.");
      });
  }

  findByID(id) {
    return this.database
      .query(`SELECT * FROM ${this.table} WHERE id = ?`, [id])
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to retrieve data from the database.");
      });
  }
}

module.exports = UserManager;
