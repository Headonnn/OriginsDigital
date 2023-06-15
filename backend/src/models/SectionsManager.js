const AbstractManager = require("./AbstractManager");

class SectionsManager extends AbstractManager {
  constructor() {
    super({ table: "section" });
  }
}
module.exports = SectionsManager;
