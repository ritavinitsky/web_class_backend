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
const bcrypt_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Received request body:", req.body);
    const { email, name, age, password } = req.body;
    const dailyCal = '0';
    if (!email || !password) {
        console.log("Missing email or password");
        return res.status(400).json({ message: "Missing email or password" });
    }
    try {
        const existingUser = yield user_model_1.default.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already exists", });
        }
        console.log("Hashing password...");
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        console.log("Creating new user...");
        const newUser = yield user_model_1.default.create({
            name,
            age,
            email,
            password: hashedPassword,
            dailyCal,
        });
        console.log("New user created:", newUser);
        return res.status(200).json(newUser); // 201 Created
    }
    catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({ message: "An error occurred while registering the user" });
    }
});
const generateTokens = (userId) => {
    const accessToken = jsonwebtoken_1.default.sign({ _id: userId }, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION });
    const refreshToken = jsonwebtoken_1.default.sign({ _id: userId }, process.env.REFRESH_TOKEN_SECRET);
    console.log("Generated tokens - Access Token:", accessToken, "Refresh Token:", refreshToken);
    return { accessToken, refreshToken };
};
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Attempting login...");
    const { email, password } = req.body;
    if (!email || !password) {
        console.log("Missing email or password");
        return res.status(400).json({ message: "Missing email or password" });
    }
    try {
        console.log("Fetching user from database...");
        // Fetch user with email and password fields
        const user = yield user_model_1.default.findOne({ email }).select('email password tokens');
        if (!user) {
            console.log("User not found");
            return res.status(400).json({ message: "Invalid email or password" });
        }
        console.log("Comparing passwords...");
        // Log the input and stored password for debugging
        console.log("Input password:", password);
        console.log("Stored hashed password:", user.password);
        // Compare the input password with the stored hashed password
        const validPassword = yield bcrypt_1.default.compare(password, user.password);
        console.log("Password valid?:", validPassword);
        if (validPassword) {
            const { accessToken, refreshToken } = generateTokens(user._id.toString());
            // Ensure tokens array exists
            if (!user.tokens) {
                user.tokens = [refreshToken];
            }
            else {
                user.tokens = user.tokens.filter(token => token !== refreshToken); // Remove old refresh tokens if necessary
                user.tokens.push(refreshToken);
            }
            yield user.save();
            console.log("Login successful");
            return res.status(200).json({
                accessToken,
                refreshToken,
                user_id: user._id
            });
        }
        else {
            console.log("Invalid password");
            return res.status(400).json({ message: "Invalid email or password" });
        }
    }
    catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "An error occurred during login" });
    }
});
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers['authorization'];
    const refreshToken = authHeader && authHeader.split(' ')[1];
    if (refreshToken == null) {
        return res.status(401).send("missing token");
    }
    jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, userInfo) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(401).send("invalid token");
        }
        try {
            const user = yield user_model_1.default.findById(userInfo._id);
            if (!user.tokens == null || !user.tokens.includes(refreshToken)) {
                user.tokens = [];
                yield user.save();
                return res.status(401).send("No refresh tokens to use");
            }
            else {
                user.tokens = user.tokens.filter(token => token !== refreshToken);
                yield user.save();
                return res.status(200).send();
            }
        }
        catch (error) {
            console.log(error);
            return res.status(400).send(error.message);
        }
    }));
});
const refresh = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //extract token from header
    const authHeader = req.headers['authorization'];
    const oldRefreshToken = authHeader && authHeader.split(' ')[1];
    if (oldRefreshToken == null) {
        return res.status(401).send("missing token");
    }
    //verify token
    jsonwebtoken_1.default.verify(oldRefreshToken, process.env.REFRESH_TOKEN_SECRET, (err, userInfo) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(403).send(err.name);
        }
        try {
            const user = yield user_model_1.default.findById(userInfo._id);
            if (user == null || user.tokens == null || !user.tokens.includes(oldRefreshToken)) {
                if (user.tokens != null) {
                    user.tokens = [];
                    yield user.save();
                }
                return res.status(403).send("invalid token");
            }
            //generate new refresh token
            const { accessToken, refreshToken } = generateTokens(user._id.toString());
            //update refresh token in db
            user.tokens = user.tokens.filter(token => token !== oldRefreshToken);
            user.tokens.push(refreshToken.toString());
            yield user.save();
            //return new access token & new refresh token
            return res.status(200).send({ 'accessToken': accessToken, 'refreshToken': refreshToken.toString() });
        }
        catch (error) {
            console.log(error);
            return res.status(400).send(error.message);
        }
    }));
});
exports.default = {
    register,
    login,
    logout,
    refresh
};
//# sourceMappingURL=auth_controller.js.map