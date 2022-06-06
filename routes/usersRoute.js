const express = require("express");
const userController = require("../controllers/userControllers");

const router = express.Router();

router
  .route("/")
  .get(userController.getUsersHandler)
  .post(userController.createUserHandler);

router.route("/:id").put(userController.updateUserHabndler);

module.exports = router;
