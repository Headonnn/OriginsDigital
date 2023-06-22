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
        const [name] = await models.videoCategory.findCatName(
          section.carousel_category_id
        );
        section.name = Object.values(name[0]);
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

module.exports = {
  browse,
};
