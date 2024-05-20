"use strict";
/*import express from "express";
const router = express.Router();
import userController from "../controllers/user_controller";
import authMiddleware from "../common/auth_middleware";

router.get("/",  authMiddleware, userController.get.bind(userController));

router.get("/:id", authMiddleware, userController.getById.bind(userController));


router.put("/:id",authMiddleware, userController.put.bind(userController));

router.delete("/:id", authMiddleware, userController.remove.bind(userController));


export default router;
*/
Object.defineProperty(exports, "__esModule", { value: true });
/*import express from "express";
const router = express.Router();
import userController from "../controllers/user_controller";
import authMiddleware from "../common/auth_middleware";

router.post("/register", userController.register.bind(userController));
router.post("/login", userController.login.bind(userController));
router.post("/logout", authMiddleware, userController.logout.bind(userController));

router.get("/", authMiddleware, userController.get.bind(userController));
router.get("/:id", authMiddleware, userController.getById.bind(userController));
router.put("/:id", authMiddleware, userController.put.bind(userController));
router.delete("/:id", authMiddleware, userController.remove.bind(userController));

export default router;
*/
const express_1 = require("express");
const user_controller_1 = require("../controllers/user_controller");
const router = (0, express_1.Router)();
router.post('/register', user_controller_1.register);
router.post('/login', user_controller_1.login);
exports.default = router;
//# sourceMappingURL=user_route.js.map