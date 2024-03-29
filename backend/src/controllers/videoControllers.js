const models = require("../models");

const browse = (req, res) => {
  models.video
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

const read = (req, res) => {
  models.video
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const video = req.body;

  // TODO validations (length, format...)

  video.id = parseInt(req.params.id, 10);

  models.video
    .update(video)
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

const add = (req, res) => {
  const video = req.body;

  models.video
    .insert(video)
    .then(([result]) => {
      res.send(result).status(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.video
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

const filterCategory = (req, res) => {
  const categoryId = parseInt(req.params.categorie, 10);

  if (Number.isNaN(categoryId)) {
    res.sendStatus(400); // Bad request if the category ID is not a valid number
    return;
  }

  models.video
    .get(categoryId)
    .then(([rows]) => {
      const videoData = rows.map((row) => {
        return {
          id: row.id,
          title: row.title,
          url: row.url,
          description: row.description,
          thumbnail: row.thumbnail,
          is_freemium: row.is_freemium,
          date: row.date,
        };
      });
      res.json(videoData);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const editFreemium = (req, res) => {
  const video = req.body;

  video.id = parseInt(req.params.id, 10);

  models.video
    .updateFreemium(video)
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
const editHero = (req, res) => {
  const video = req.body;

  video.id = parseInt(req.params.id, 10);

  models.video
    .updateHero(video)
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

const filterIsFreemium = (req, res) => {
  models.video
    .isFreemium()
    .then(([rows]) => {
      const videoData = rows.map((row) => {
        return {
          title: row.title,
          url: row.url,
          description: row.description,
          thumbnail: row.thumbnail,
          date: row.date,
        };
      });

      res.json(videoData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  filterCategory,
  editFreemium,
  filterIsFreemium,
  editHero,
};
