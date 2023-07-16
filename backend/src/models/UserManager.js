const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(user) {
    const { email, hashedPassword, firstname, lastname } = user;

    return this.database.query(
      `INSERT INTO ${this.table} (email, hashedPassword, firstname, lastname) VALUES (?, ?, ?, ?, ?)`,
      [email, hashedPassword, firstname, lastname]
    );
  }

  updateAll(user) {
    const { firstname, email, hashedPassword, id } = user;

    return this.database.query(
      `UPDATE ${this.table} SET firstname=?, email=?, hashedPassword=? WHERE id=?`,
      [firstname, email, hashedPassword, id]
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
        throw new Error("Failed to retrieve data from the database AZERTY.");
      });
  }
}

module.exports = UserManager;
