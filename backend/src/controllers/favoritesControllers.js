const models = require("../models");

const add = (req, res) => {
  const fav = req.body;

  // TODO validations (length, format...)

  models.favorites
    .add(fav)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const destroy = (req, res) => {
  const fav = {
    userId: req.params.userid,
    videoId: req.params.videoid,
  };
  models.favorites
    .destroy(fav)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const read = (req, res) => {
  models.favorites
    .findByUser(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        console.warn("pas encore de favoris :)");
      } else {
        res.send(rows.map((e) => Object.values(e)[0]));
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
module.exports = {
  add,
  destroy,
  read,
};
