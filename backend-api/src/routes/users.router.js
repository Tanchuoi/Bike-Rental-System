import express from "express";
import * as userController from "../controllers/users.controller.js";

const router = express.Router();

router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/users", userController.getUsers);
router.delete("/user/:id", userController.deleteUser);
export default router;
