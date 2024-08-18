"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user_model"));
const base_controller_1 = __importDefault(require("./base_controller"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserController extends base_controller_1.default {
    constructor() {
        super(user_model_1.default);
    }
    // Method to update password based on email
    updatePasswordByEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.params;
                const { password } = req.body;
                if (!email || !password) {
                    return res.status(400).json({ message: 'Email and password are required' });
                }
                // Find the user by email
                const user = yield user_model_1.default.findOne({ email });
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                // Hash the new password
                const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
                // Update the user's password
                user.password = hashedPassword;
                yield user.save();
                res.status(200).json({ message: 'Password updated successfully' });
            }
            catch (err) {
                console.error('Error updating password:', err);
                res.status(500).send(err.message);
            }
        });
    }
    put(req, res) {
        const _super = Object.create(null, {
            put: { get: () => super.put }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("update user id: " + req.params.id);
                let item = yield user_model_1.default.findById(req.params.id);
                item.name = req.body.name;
                item.email = req.body.email;
                item.age = req.body.age;
                item.dailyCal = req.body.dailyCal;
                //item.imgUrl = req.body.imgUrl;
                req.body = item;
                _super.put.call(this, req, res);
                console.log(item.dailyCal);
            }
            catch (err) {
                console.log("The error in updating user is: " + err);
                res.status(400).send(err.message);
            }
        });
    }
}
exports.default = new UserController();
//# sourceMappingURL=user_controller.js.map