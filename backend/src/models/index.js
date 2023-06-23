require("dotenv").config();

const mysql = require("mysql2/promise");

// create a connection pool to the database

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

// try a connection

pool.getConnection().catch(() => {
  console.warn(
    "Warning:",
    "Failed to get a DB connection.",
    "Did you create a .env file with valid credentials?",
    "Routes using models won't work as intended"
  );
});

// declare and fill models: that's where you should register your own managers

const models = {};

const ItemManager = require("./ItemManager");
const UserManager = require("./UserManager");
const VideoManager = require("./VideoManager");
const CategoryManager = require("./CategoryManager");
const SectionsManager = require("./SectionsManager");
const VideoCarouselManager = require("./VideoCarouselManager");
const CarouselCustomManager = require("./CarouselCustomManager");
const CarouselCategoryManager = require("./CarouselCategoryManager");
const VideoCategoryManager = require("./VideoCategoryManager");
const FavoritesManager = require("./FavoritesManager");

models.item = new ItemManager();
models.user = new UserManager();
models.video = new VideoManager();
models.category = new CategoryManager();
models.section = new SectionsManager();
models.videoCarousel = new VideoCarouselManager();
models.carouselCustom = new CarouselCustomManager();
models.carouselCategory = new CarouselCategoryManager();
models.videoCategory = new VideoCategoryManager();
models.favorites = new FavoritesManager();
models.user.setDatabase(pool);
models.video.setDatabase(pool);
models.category.setDatabase(pool);
models.section.setDatabase(pool);
models.videoCarousel.setDatabase(pool);
models.carouselCustom.setDatabase(pool);
models.carouselCategory.setDatabase(pool);
models.videoCategory.setDatabase(pool);
models.favorites.setDatabase(pool);
// bonus: use a proxy to personalize error message,
// when asking for a non existing model

const handler = {
  get(obj, prop) {
    if (prop in obj) {
      return obj[prop];
    }

    const pascalize = (string) =>
      string.slice(0, 1).toUpperCase() + string.slice(1);

    throw new ReferenceError(
      `models.${prop} is not defined. Did you create ${pascalize(
        prop
      )}Manager.js, and did you register it in backend/src/models/index.js?`
    );
  },
};

module.exports = new Proxy(models, handler);
