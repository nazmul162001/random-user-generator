const express = require("express");
const userController = require("../controllers/userController");
const route = express.Router();

route.get("/random", userController.getRandomUser);
route.get("/all", userController.getAllUser);
route.post("/save", userController.saveRandomUser);
route.patch("/update/:id", userController.updateRandomUser);
route.patch("/bulk-update", userController.updateMultipleUser);
route.delete("/delete/:id", userController.deleteUser);

module.exports = route;