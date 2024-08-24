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
const nodemailer_1 = __importDefault(require("nodemailer"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserController extends base_controller_1.default {
    constructor() {
        super(user_model_1.default);
    }
    getByEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.params;
            if (!email) {
                return res.status(400).json({ message: 'Email is required' });
            }
            try {
                console.log(`Finding user by email: ${email}`);
                const user = yield user_model_1.default.findOne({ email });
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                console.log('User found:', user);
                res.status(200).json(user);
            }
            catch (err) {
                console.error('Error fetching user by email:', err);
                res.status(500).send(err.message);
            }
        });
    }
    updatePasswordByEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("update password by email");
            const { password } = req.body;
            const { email } = req.params;
            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password are required' });
            }
            try {
                console.log(`Finding user by email: ${email}`);
                const user = yield user_model_1.default.findOne({ email });
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                console.log('User found:', user);
                const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
                console.log('Hashed password:', hashedPassword);
                user.password = hashedPassword;
                yield user.save();
                console.log('User updated successfully');
                // Setup email transport
                const transporter = nodemailer_1.default.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: process.env.EMAILUSER,
                        pass: process.env.EMAILPASS,
                    }
                });
                // Email options
                const mailOptions = {
                    from: process.env.EMAILUSER,
                    to: email,
                    subject: 'Password Reset',
                    text: `Your password has been updated to: ${password}` // Changed 'message' to 'text'
                };
                // Send the email
                yield transporter.sendMail(mailOptions);
                console.log('Email sent successfully');
                res.status(200).json({ message: 'Password updated successfully' });
            }
            catch (err) {
                console.error('Error updating password:', err);
                res.status(500).send(err.message);
            }
        });
    }
    updateRemaningCalories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("update remaining calories");
            const { userId, remaningCalories, input } = req.body;
            if (!userId || remaningCalories === undefined) {
                return res.status(400).json({ message: 'User ID and remaningCalories are required' });
            }
            try {
                console.log(`Finding user by ID: ${userId}`);
                const user = yield user_model_1.default.findById(userId);
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                console.log('User found:', user);
                user.remaningCal = Math.floor(remaningCalories); // Update the field
                // Only add the most recent input
                const formattedInput = {
                    food: input.food,
                    cal: input.cal,
                    date: new Date().toISOString().split('T')[0],
                };
                user.inputRecords.push(formattedInput);
                yield user.save();
                console.log('User updated successfully');
                res.status(200).json({ message: 'Remaining calories updated successfully', user });
            }
            catch (err) {
                console.error('Error updating remaining calories:', err);
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
                item.remaningCal = req.body.remaningCal;
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