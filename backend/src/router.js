const express = require("express");

const router = express.Router();

const {
  hashPassword,
  verifyPassword,
  verifyPasswordAndGenerateToken,
  verifyPasswordBeforeDelete,
  verifyToken,
} = require("./auth");

const userControllers = require("./controllers/userControllers");
const videoControllers = require("./controllers/videoControllers");
const sectionControllers = require("./controllers/sectionsControllers");
const categoryControllers = require("./controllers/categoryControllers");
const videoCarouselControllers = require("./controllers/videoCarouselControllers");
const carouselCustomControllers = require("./controllers/carouselCustomControllers");
const carouselCategoryControllers = require("./controllers/carouselCategoryControllers");
const videoCategoryControllers = require("./controllers/videoCategoryControllers");
const favoritesControllers = require("./controllers/favoritesControllers");

// OPEN ROUTES _________________________________________________________________

// User routes
router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.post("/users", hashPassword, userControllers.add);
router.post(
  "/users/login",
  userControllers.getUserByEmailWithPasswordAndPassToNext,
  verifyPasswordAndGenerateToken
);

// Video routes

router.get("/videos", videoControllers.browse);
router.get("/videos/get/is_freemium", videoControllers.filterIsFreemium);
router.get("/videos/:id", videoControllers.read);
router.get("/videos/filtre/:categorie", videoControllers.filterCategory);

// Category routes

router.get("/categories", categoryControllers.browse);
router.get("/categories/:id", categoryControllers.read);

// Sections routes

router.get("/sections", sectionControllers.browse);
router.get("/sections/ordre", sectionControllers.browseordre);

// video_carousel routes

router.get("/videos_carousel/:id", videoCarouselControllers.read);

// carousel_custom routes

router.get("/carousel_custom", carouselCustomControllers.browse);
router.get("/carousel_custom/:id", carouselCustomControllers.read);

// carousel_category routes

router.get("/carousel_category", carouselCategoryControllers.browse);
router.get("/carousel_category/:id", carouselCategoryControllers.read);

// video_category routes

router.get(
  "/videos_category/get_category/:id",
  videoCategoryControllers.findAll
);
router.get("/videos_category/:id", videoCategoryControllers.read);

// SECURE ROUTES________________________________________________________________

router.use(verifyToken);

// user routes

router.put("/users/:id", userControllers.edit);
router.put(
  "/users/:id/edit",
  userControllers.verifyUser,
  verifyPassword,
  userControllers.editByUser
);
router.delete("/users/:id", userControllers.destroy);
router.delete(
  "/users/delete/:id",
  userControllers.verifyUser,
  verifyPasswordBeforeDelete,
  userControllers.destroy
);
// Video routes

router.put("/videos/:id/edit", videoControllers.edit);
router.put("/videos/:id/is_freemium", videoControllers.editFreemium);
router.post("/videos", videoControllers.add);
router.delete("/videos/:id/delete", videoControllers.destroy);
router.put("/videos/:id/hero", videoControllers.editHero);

// video_category routes

router.post("/videos_category", videoCategoryControllers.post);
router.delete("/videos_category/:id", videoCategoryControllers.destroy);

// Category routes

router.put("/categories/:id/edit", categoryControllers.edit);
router.post("/categories", categoryControllers.add);
router.delete("/categories/:id/delete", categoryControllers.destroy);

// Section routes
router.put("/sections/:id", sectionControllers.edit);
router.put("/sections/:id/visibility", sectionControllers.editVis);
router.post("/sections/custom", sectionControllers.addcustom);
router.post("/sections/category", sectionControllers.addcategory);
router.delete("/sections/:id", sectionControllers.destroy);

// Video Carousel route

router.post("/videos_carousel", videoCarouselControllers.add);
router.delete("/videos_carousel/:id", videoCarouselControllers.destroy);

// Carousel Custom route

router.post("/carousel_custom", carouselCustomControllers.add);
router.put("/carousel_custom/:id", carouselCustomControllers.edit);
router.delete("/carousel_custom/:id", carouselCustomControllers.destroy);

// Carousel Category route

router.post("/carousel_category", carouselCategoryControllers.add);
router.put("/carousel_category/:id", carouselCategoryControllers.edit);
module.exports = router;
router.post("/carousel_category", carouselCategoryControllers.add);
router.delete("/carousel_category/:id", carouselCategoryControllers.destroy);

// favorites routes

router.post("/favorites/add", favoritesControllers.add);
router.delete("/favorites/:userid/:videoid", favoritesControllers.destroy);
router.get("/favorites/:id", favoritesControllers.read);
