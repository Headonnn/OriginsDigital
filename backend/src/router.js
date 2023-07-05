const express = require("express");

const router = express.Router();

const { hashPassword, verifyPassword } = require("./auth");

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
  verifyPassword
);

// Video routes
router.get("/videos", videoControllers.browse);
router.get("/videos/get/is_freemium", videoControllers.filterIsFreemium);
router.get("/videos/:id", videoControllers.read);
router.put("/videos/:id/edit", videoControllers.edit);
router.put("/videos/:id/is_freemium", videoControllers.editFreemium);
router.post("/videos", videoControllers.add);
router.delete("/videos/:id/delete", videoControllers.destroy);
router.get("/videos/filtre/:categorie", videoControllers.filterCategory);

// Category routes
router.get("/categories", categoryControllers.browse);
router.get("/categories/:id", categoryControllers.read);
router.put("/categories/:id/edit", categoryControllers.edit);
router.post("/categories", categoryControllers.add);
router.delete("/categories/:id/delete", categoryControllers.destroy);

// Sections routes

router.get("/sections", sectionControllers.browse);
router.get("/sections/ordre", sectionControllers.browseordre);
router.put("/sections/:id", sectionControllers.edit);
router.post("/sections/custom", sectionControllers.addcustom);
router.post("/sections/category", sectionControllers.addcategory);

// video_carousel routes
router.get("/videos_carousel/:id", videoCarouselControllers.read);
router.post("/videos_carousel", videoCarouselControllers.add);
// carousel_custom routes
router.get("/carousel_custom", carouselCustomControllers.browse);
router.get("/carousel_custom/:id", carouselCustomControllers.read);
router.post("/carousel_custom", carouselCustomControllers.add);

// carousel_category routes
router.get("/carousel_category", carouselCategoryControllers.browse);
router.get("/carousel_category/:id", carouselCategoryControllers.read);
router.post("/carousel_category", carouselCategoryControllers.add);

// video_category routes
router.get("/videos_category/:id", videoCategoryControllers.read);

// favorites routes
router.post("/favorites/add", favoritesControllers.add);
router.delete("/favorites/:userid/:videoid", favoritesControllers.destroy);
router.get("/favorites/:id", favoritesControllers.read);

module.exports = router;
