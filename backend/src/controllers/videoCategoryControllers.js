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

module.exports = { read, post };
