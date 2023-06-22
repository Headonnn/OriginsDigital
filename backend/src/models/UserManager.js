const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(user) {
    const { username, email, hashedPassword, firstname, lastname } = user;

    return this.database.query(
      `INSERT INTO ${this.table} (username, email, hashedPassword, firstname, lastname) VALUES (?, ?, ?, ?, ?)`,
      [username, email, hashedPassword, firstname, lastname]
    );
  }

  updateAll(user) {
    const { username, email, firstname, lastname, id } = user;

    return this.database.query(
      `UPDATE ${this.table} SET username=?, email=?, firstname=?, lastname=? WHERE id=?`,
      [username, email, firstname, lastname, id]
    );
  }

  update(user) {
    const { id, isAdmin } = user;

    return this.database.query(
      `UPDATE ${this.table} SET is_admin=? WHERE id=?`,
      [isAdmin, id]
    );
  }
}

module.exports = UserManager;
