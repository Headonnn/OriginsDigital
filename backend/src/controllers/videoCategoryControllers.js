const models = require("../models");

const read = (req, res) => {
  models.videoCategory
    .findCatId(req.params.id)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const findAll = (req, res) => {
  models.videoCategory
    .findAllFromVid(req.params.id)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const post = (req, res) => {
  const vidCat = req.body;

  models.videoCategory
    .insert(vidCat)
    .then(([result]) => {
      res.send(result).status(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const destroy = (req, res) => {
  models.videoCategory
    .delete(req.params.id)
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
module.exports = { read, post, findAll, destroy };
