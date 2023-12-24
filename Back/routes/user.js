const router = require("express").Router();
const userController = require("../controller/userController");
const express = require("express");
const app = express();
const path = require("path");
router.post("/add", userController.addUser);
router.put("/edit/:id",userController.updateUser)
router.delete("/delete/:id",userController.deleteUser)
router.get("/get",userController.list)
router.get("/get/:id",userController.getUserById)
module.exports = router;

