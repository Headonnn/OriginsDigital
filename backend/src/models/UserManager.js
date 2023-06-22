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

  update(user) {
    const { id, username, email, hashedPassword, firstname, lastname } = user;

    return this.database.query(
      `UPDATE ${this.table} SET username=?, email=?, hashedPassword=?, firstname=?, lastname=? WHERE id=?`,
      [username, email, hashedPassword, firstname, lastname, id]
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
