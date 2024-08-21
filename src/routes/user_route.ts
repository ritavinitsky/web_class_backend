import express from "express";
const router = express.Router();
import UserController from "../controllers/user_controller";
import authMiddleware from "../common/auth_middleware";

router.get("/",  authMiddleware, UserController.get.bind(UserController));

router.get("/:id", authMiddleware, UserController.getById.bind(UserController));

router.put("/:id",authMiddleware, UserController.put.bind(UserController));

router.delete("/:id", authMiddleware, UserController.remove.bind(UserController));

// Fetch user by email
router.get("/email/:email", UserController.getByEmail.bind(UserController));

router.put("/email/:email/password", UserController.updatePasswordByEmail.bind(UserController));

// Define the route to update remaining calories
router.post('/updateRemainingCalories', UserController.updateRemainingCalories.bind(UserController));
export default router;