const models = require("../models");

const read = (req, res) => {
  models.videoCarousel
    .findCarId(req.params.id)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const add = (req, res) => {
  const video = req.body;

  // TODO validations (length, format...)

  models.videoCarousel
    .insert(video)
    .then(([result]) => {
      res.send(result).status(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = { read, add };
