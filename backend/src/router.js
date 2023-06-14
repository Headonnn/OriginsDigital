const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");
const userControllers = require("./controllers/userControllers");
const videoControllers = require("./controllers/videoControllers");
const categoryControllers = require("./controllers/categoryControllers");

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
router.post("/users", userControllers.add);
router.delete("/users/:id", userControllers.destroy);

// Video routes
router.get("/videos", videoControllers.browse);
router.get("/videos/:id", videoControllers.read);
router.put("/videos/:id", videoControllers.edit);
router.post("/videos", videoControllers.add);
router.delete("/videos/:id", videoControllers.destroy);

// Category routes
router.get("/categories", categoryControllers.browse);
router.get("/categories/:id", categoryControllers.read);
router.put("/categories/:id", categoryControllers.edit);
router.post("/categories", categoryControllers.add);
router.delete("/categories/:id", categoryControllers.destroy);

module.exports = router;
