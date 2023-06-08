const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(user) {
    const { username } = user;
    const { email } = user;
    const { password } = user;
    const { firstname } = user;
    const { lastname } = user;

    return this.database.query(
      `INSERT INTO ${this.table} (username, email, password, firstname, lastname) VALUES ("${username}", "${email}", "${password}", "${firstname}", "${lastname}")`
    );
  }

  update(user) {
    const { id } = user;
    const { username } = user;
    const { email } = user;
    const { password } = user;
    const { firstname } = user;
    const { lastname } = user;

    return this.database.query(
      `UPDATE ${this.table} SET username="${username}", email="${email}", password="${password}", firstname="${firstname}", lastname="${lastname}" WHERE id=${id}`
    );
  }
}

module.exports = UserManager;
