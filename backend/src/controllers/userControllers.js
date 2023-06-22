const models = require("../models");

const browse = (req, res) => {
  models.user
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("error const browse userCont");
    });
};

const read = (req, res) => {
  models.user
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.status(404).send("error 404");
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("error const read userCont");
    });
};

const edit = (req, res) => {
  const user = req.body;

  // TODO validations (length, format...)

  user.id = parseInt(req.params.id, 10);

  models.user
    .update(user)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("error 404");
      } else {
        res.status(204).send();
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("error const edit userCont");
    });
};

const add = (req, res) => {
  const user = req.body;
  console.warn(user);

  // TODO validations (length, format...)

  models.user
    .insert(user)
    .then(([result]) => {
      res.location(`/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("error const add userCont");
    });
};

const destroy = (req, res) => {
  models.user
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("error 404");
      } else {
        res.status(204).send();
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("error const destroy userCont");
    });
};

const getUserByEmailWithPasswordAndPassToNext = (req, res, next) => {
  const { email } = req.body;

  models.user

    .findByMail(email)
    .then(([user]) => {
      if (user[0] != null) {
        req.user = user[0];
        console.warn("user identified by email, so far so good");
        next();
      } else {
        res.status(500).send("error 401 userController getuserbymailmachin");
      }
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .send("UserController level, error retrieving data from database");
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  getUserByEmailWithPasswordAndPassToNext,
};
