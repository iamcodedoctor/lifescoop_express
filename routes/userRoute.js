import express from "express"
import UserController from "../controllers/userController.js";
const userController = new UserController();
import {verifyToken} from "../middlewares/verifyToken.js";

const router = express.Router();

// Read
router.get("/info", verifyToken, userController.getUser);
router.get("/friends", verifyToken, userController.getUserFriends);

// Update
router.patch("/:friendId", verifyToken, userController.addRemoveFriends);

export default router