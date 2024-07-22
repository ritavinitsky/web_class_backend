import { Request, Response } from "express";
import User from "../models/user_model";
import bcrypt from "bcryptjs";  // Change this import
import jwt from 'jsonwebtoken';

const register = async (req: Request, res: Response) => {
    console.log("Received request body:", req.body);

    const { email, name, age, password } = req.body;
    const dailyCal = '0';

    if (!email || !password) {
        console.log("Missing email or password");
        return res.status(400).json({ message: "Missing email or password" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already exists" });
        }

        console.log("Hashing password...");
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        console.log("Creating new user...");
        const newUser = await User.create({
            name,
            age,
            email,
            password: hashedPassword,
            dailyCal,
        });

        console.log("New user created:", newUser);
        return res.status(200).json(newUser); // 201 Created
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({ message: "An error occurred while registering the user" });
    }
};

const generateTokens = (userId: string) => {
    const accessToken = jwt.sign({ _id: userId }, process.env.TOKEN_SECRET as string, { expiresIn: process.env.TOKEN_EXPIRATION });
    const refreshToken = jwt.sign({ _id: userId }, process.env.REFRESH_TOKEN_SECRET as string);
    console.log("Generated tokens - Access Token:", accessToken, "Refresh Token:", refreshToken);
    return { accessToken, refreshToken };
};

const login = async (req: Request, res: Response) => {
    console.log("Attempting login...");

    const { email, password } = req.body;

    if (!email || !password) {
        console.log("Missing email or password");
        return res.status(400).json({ message: "Missing email or password" });
    }

    try {
        console.log("Fetching user from database...");
        const user = await User.findOne({ email }).select('email password tokens');

        if (!user) {
            console.log("User not found");
            return res.status(400).json({ message: "Invalid email or password" });
        }

        console.log("Comparing passwords...");
        console.log("Input password:", password);
        console.log("Stored hashed password:", user.password);

        const validPassword = await bcrypt.compare(password, user.password);
        console.log("Password valid?:", validPassword);

        if (validPassword) {
            const { accessToken, refreshToken } = generateTokens(user._id.toString());

            if (!user.tokens) {
                user.tokens = [refreshToken];
            } else {
                user.tokens = user.tokens.filter(token => token !== refreshToken);
                user.tokens.push(refreshToken);
            }

            await user.save();

            console.log("Login successful");
            return res.status(200).json({
                accessToken,
                refreshToken,
                user_id: user._id
            });
        } else {
            console.log("Invalid password");
            return res.status(400).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "An error occurred during login" });
    }
};

const logout = async (req: Request, res: Response) => {
    const authHeader = req.headers['authorization'];
    const refreshToken = authHeader && authHeader.split(' ')[1];
    if (refreshToken == null) {
        return res.status(401).send("missing token");
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, userInfo: { _id: string }) => {
        if (err) {
            return res.status(401).send("invalid token");
        }
        try {
            const user = await User.findById(userInfo._id);
            if (!user.tokens || !user.tokens.includes(refreshToken)) {
                user.tokens = [];
                await user.save();
                return res.status(401).send("No refresh tokens to use");
            } else {
                user.tokens = user.tokens.filter(token => token !== refreshToken);
                await user.save();
                return res.status(200).send();
            }
        } catch (error) {
            console.log(error);
            return res.status(400).send(error.message);
        }
    });
};

const refresh = async (req: Request, res: Response) => {
    const authHeader = req.headers['authorization'];
    const oldRefreshToken = authHeader && authHeader.split(' ')[1];
    if (oldRefreshToken == null) {
        return res.status(401).send("missing token");
    }
    jwt.verify(oldRefreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, userInfo: { _id: string }) => {
        if (err) {
            return res.status(403).send(err.name);
        }
        try {
            const user = await User.findById(userInfo._id);
            if (user == null || user.tokens == null || !user.tokens.includes(oldRefreshToken)) {
                if (user.tokens != null) {
                    user.tokens = [];
                    await user.save();
                }
                return res.status(403).send("invalid token");
            }
            const { accessToken, refreshToken } = generateTokens(user._id.toString());

            user.tokens = user.tokens.filter(token => token !== oldRefreshToken);
            user.tokens.push(refreshToken.toString());
            await user.save();

            return res.status(200).send({ 'accessToken': accessToken, 'refreshToken': refreshToken.toString() });
        } catch (error) {
            console.log(error);
            return res.status(400).send(error.message);
        }
    });
};

export default {
    register,
    login,
    logout,
    refresh
};
