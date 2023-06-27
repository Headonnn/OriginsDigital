const express = require("express");

const router = express.Router();

const { hashPassword, verifyPassword, verifyToken } = require("./auth");

const itemControllers = require("./controllers/itemControllers");
const userControllers = require("./controllers/userControllers");
const videoControllers = require("./controllers/videoControllers");
const sectionControllers = require("./controllers/sectionsControllers");
const categoryControllers = require("./controllers/categoryControllers");
const videoCarouselControllers = require("./controllers/videoCarouselControllers");
const carouselCustomControllers = require("./controllers/carouselCustomControllers");
const carouselCategoryControllers = require("./controllers/carouselCategoryControllers");
const videoCategoryControllers = require("./controllers/videoCategoryControllers");
const favoritesControllers = require("./controllers/favoritesControllers");
// Item routes
router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

// User routes
router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.put("/users/:id", userControllers.edit);
router.put("/users/:id/edit", userControllers.editAll);
router.post("/users", hashPassword, userControllers.add);
router.delete("/users/:id", userControllers.destroy);
router.post(
  "/users/login",
  userControllers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword,
  verifyToken
);

// Video routes
router.get("/videos", videoControllers.browse);
router.get("/videos/:id", videoControllers.read);
router.put("/videos/:id/edit", videoControllers.edit);
router.post("/videos", videoControllers.add);
router.delete("/videos/:id/delete", videoControllers.destroy);
router.get("/videos/filtre/:categorie", videoControllers.filterCategory);

// Category routes
router.get("/categories", categoryControllers.browse);
router.get("/categories/:id", categoryControllers.read);
router.put("/categories/:id/edit", categoryControllers.edit);
router.post("/categories", categoryControllers.add);
router.delete("/categories/:id", categoryControllers.destroy);

// Sections routes

router.get("/sections", sectionControllers.browse);

router.put("/sections/:id", sectionControllers.edit);

// video_carousel routes
router.get("/videos_carousel/:id", videoCarouselControllers.read);

// carousel_custom routes
router.get("/carousel_custom", carouselCustomControllers.browse);
router.get("/carousel_custom/:id", carouselCustomControllers.read);

// carousel_category routes
router.get("/carousel_category", carouselCategoryControllers.browse);
router.get("/carousel_category/:id", carouselCategoryControllers.read);

// video_category routes
router.get("/videos_category/:id", videoCategoryControllers.read);

// favorites routes
router.post("/favorites/add", favoritesControllers.add);
router.delete("/favorites/:userid/:videoid", favoritesControllers.destroy);
router.get("/favorites/:id", favoritesControllers.read);

module.exports = router;
