const express = require("express");
const router = express.Router();
const userController = require("../controller/user");

router
  .get("/", userController.getAllUsers)
  .get("/:id", userController.getUserById)
  .post("/post", userController.addUser)
  .put("/put/:id", userController.replaceUser)
  .patch("/patch/:id", userController.updateUser)
  .delete("/delete/:id", userController.deleteUser);

exports.router = router