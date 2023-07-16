/* eslint-disable */
const models = require("../models");

const browse = async (req, res) => {
  try {
    const [rows] = await models.section.findAllOrdered();

    const promises = rows.map(async (section) => {
      if (section.carousel_custom_id) {
        const [custom] = await models.carouselCustom.find(
          section.carousel_custom_id
        );
        section.carousel = custom[0];
        const [videos] = await models.videoCarousel.findCarId(
          section.carousel.id
        );
        section.videos = videos;
      } else if (section.carousel_category_id) {
        const [category] = await models.carouselCategory.find(
          section.carousel_category_id
        );

        section.carousel = category[0];
        const [videos] = await models.videoCategory.findCatId(
          section.carousel.category_id
        );

        section.videos = videos;
        const [name] = await models.carouselCategory.findCatName(
          section.carousel_category_id
        );

        name[0] && (section.name = Object.values(name[0]));
      } else {
        console.warn("advert");
      }
    });

    await Promise.all(promises);

    res.status(200).send(rows);
  } catch (e) {
    console.warn(e);
    res.sendStatus(500);
  }
};
const browseordre = (req, res) => {
  models.section
    .findAll()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
      res.senStatus(500);
    });
};
const edit = (req, res) => {
  const section = req.body;

  section.id = parseInt(req.params.id, 10);

  models.section
    .update(section)
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
const editVis = (req, res) => {
  const section = req.body;

  section.id = parseInt(req.params.id, 10);

  models.section
    .updateVis(section)
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
const addcustom = (req, res) => {
  const custom = req.body;

  models.section
    .insertcustom(custom)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const addcategory = (req, res) => {
  const category = req.body;

  models.section
    .insertcategory(category)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const destroy = (req, res) => {
  models.section
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
module.exports = {
  browse,
  edit,
  browseordre,
  addcustom,
  addcategory,
  destroy,
  editVis,
};
