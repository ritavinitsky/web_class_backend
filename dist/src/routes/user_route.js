"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_controller_1 = __importDefault(require("../controllers/user_controller"));
const auth_middleware_1 = __importDefault(require("../common/auth_middleware"));
router.get("/", auth_middleware_1.default, user_controller_1.default.get.bind(user_controller_1.default));
router.get("/:id", auth_middleware_1.default, user_controller_1.default.getById.bind(user_controller_1.default));
router.put("/:id", auth_middleware_1.default, user_controller_1.default.put.bind(user_controller_1.default));
router.delete("/:id", auth_middleware_1.default, user_controller_1.default.remove.bind(user_controller_1.default));
// Fetch user by email
router.get("/email/:email", user_controller_1.default.getByEmail.bind(user_controller_1.default));
router.put("/email/:email/password", user_controller_1.default.updatePasswordByEmail.bind(user_controller_1.default));
// Define the route to update remaining calories
router.post('/updateRemaningCalories', user_controller_1.default.updateRemaningCalories.bind(user_controller_1.default));
router.put('/updateStarRatings', user_controller_1.default.updateStarRatings.bind(user_controller_1.default));
exports.default = router;
//# sourceMappingURL=user_route.js.map