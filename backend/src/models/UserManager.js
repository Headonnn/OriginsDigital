const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(user) {
    const { username, email, password, firstname, lastname } = user;
    console.log(username);

    return this.database.query(
      `INSERT INTO ${this.table} (username, email, password, firstname, lastname) VALUES (?, ?, ?, ?, ?)`,
      [username, email, password, firstname, lastname]
    );
  }

  update(user) {
    const { id, username, email, password, firstname, lastname } = user;

    return this.database.query(
      `UPDATE ${this.table} SET username=?, email=?, password=?, firstname=?, lastname=? WHERE id=?`,
      [username, email, password, firstname, lastname, id]
    );
  }
}

module.exports = UserManager;
