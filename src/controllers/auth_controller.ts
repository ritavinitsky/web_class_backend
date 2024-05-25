/*import { Request, Response } from "express";
import User from "../models/user_model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req: Request, res: Response) => {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;

    if (email == null || password == null) {
        return res.status(400).send("missing email or password");
    }

    try {
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).send("user already exists");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            email: email,
            password: hashedPassword
        });

        return res.status(200).send(newUser);
    } catch (error) {
        console.log(error);
        return res.status(400).send(error.message);
    }
}


const generateTokens = (userId: string): { accessToken: string, refreshToken: string } => {
    const accessToken = jwt.sign({
        _id: userId
    }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION
    });

    const refreshToken = jwt.sign({
        _id: userId,
        salt: Math.random()
    }, process.env.REFRESH_TOKEN_SECRET);

    return {
        accessToken: accessToken,
        refreshToken: refreshToken
    }
}

const login = async (req: Request, res: Response) => {
    console.log("login");

    const email = req.body.email;
    const password = req.body.password;

    if (email == null || password == null) {
        return res.status(400).send("missing email or password");
    }

    try {
        const user = await User.findOne({ email: email });

        if (user == null) {
            return res.status(400).send("invalid email or password");
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.status(400).send("invalid email or password");
        }

        const { accessToken, refreshToken } = generateTokens(user._id.toString());

        if (user.tokens == null) {
            user.tokens = [refreshToken];
        } else {
            user.tokens.push(refreshToken);
        }
        await user.save();
        return res.status(200).send({
            accessToken: accessToken,
            refreshToken: refreshToken
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send(error.message);
    }
}

const logout = (req: Request, res: Response) => {
    res.status(400).send("logout");
}

const refresh = async (req: Request, res: Response) => {
    //extract token from http header
    const authHeader = req.headers['authorization'];
    const refreshTokenOrig = authHeader && authHeader.split(' ')[1];

    if (refreshTokenOrig == null) {
        return res.status(401).send("missing token");
    }

    //verify token
    jwt.verify(refreshTokenOrig, process.env.REFRESH_TOKEN_SECRET, async (err, userInfo: { _id: string }) => {
        if (err) {
            return res.status(403).send("invalid token");
        }

        try {
            const user = await User.findById(userInfo._id);
            if (user == null || user.tokens == null || !user.tokens.includes(refreshTokenOrig)) {
                if (user.tokens != null) {
                    user.tokens = [];
                    await user.save();
                }
                return res.status(403).send("invalid token");
            }

            //generate new access token
            const { accessToken, refreshToken } = generateTokens(user._id.toString());

            //update refresh token in db
            user.tokens = user.tokens.filter(token => token != refreshTokenOrig);
            user.tokens.push(refreshToken);
            await user.save();

            //return new access token & new refresh token
            return res.status(200).send({
                accessToken: accessToken,
                refreshToken: refreshToken
            });
        } catch (error) {
            console.log(error);
            return res.status(400).send(error.message);
        }
    });
}

export default {
    register,
    login,
    logout,
    refresh
}

*/
import { Request, Response } from "express"
import User from "../models/user_model"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

const register = async (req: Request, res: Response) => 
{
    console.log(req.body)
    const email = req.body.email
    const name = req.body.name
    const age = req.body.age
    //const imgUrl = req.body.imgUrl
    const password = req.body.password
    if(email == null || password == null)
    {
        return res.status(400).send("missing email or password")
    }
    try {
        const user = await User.findOne({email: email})
        if(user) 
        {
            return res.status(200).send("user already exists")
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = await User.create({
            'name': name,
            'age': age,
            'email': email,
            'password': hashedPassword
        })
        return res.status(200).send(newUser)
    } catch (error) {
        console.log(error)
        return res.status(400).send(error.message)
    }
}

const generateTokens = (userId: string):{accessToken: string, refreshToken: string} => {
    const token = jwt.sign({_id: userId}, process.env.TOKEN_SECRET, {expiresIn: process.env.TOKEN_EXPIRATION})
    const refreshToken = jwt.sign({_id: userId}, process.env.REFRESH_TOKEN_SECRET)
    return {
        accessToken: token,
        refreshToken: refreshToken
    }
}

const login = async (req: Request, res: Response) => 
{
    console.log("try login");
    const email = req.body.email
    const password = req.body.password
    if(email == null || password == null)
    {
        return res.status(400).send("missing email or password")
        console.log("missing email or password")
    }

    
    try {
        console.log("try login 2")
        const user = await User.findOne({email: email})
        if(user == null) 
        {

            console.log("invalid user or password")
            return res.status(400).send("invalid user or password")
            

        }
        const validPassword = bcrypt.compare(password, user.password)
        if(validPassword == null)
        {
            console.log("invalid user or password")
            return res.status(400).send("invalid user or password")
            
        }
        const {accessToken, refreshToken} = generateTokens(user._id.toString())
        if(user.tokens.length == 0) {
            user.tokens = [refreshToken.toString()]
        }else {
            user.tokens.push(refreshToken.toString());
        }
        await user.save()
        console.log("logged in successfully")
        return res.status(200).send({'accessToken': accessToken, 'refreshToken': refreshToken, 'user_id': user._id})
        
    } catch (error) {
        console.log(error)
        console.log("error in login")
        return res.status(400).send(error.message)
    }
}

const logout = async(req: Request, res: Response) => 
{
    const authHeader = req.headers['authorization']
    const refreshToken = authHeader && authHeader.split(' ')[1];
    if(refreshToken == null)
    {
        return res.status(401).send("missing token");
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async(err, userInfo: {_id: string}) => {
        if (err) {
            return res.status(401).send("invalid token"); 
        }
        try {
            const user = await User.findById(userInfo._id);
            if (!user.tokens == null || !user.tokens.includes(refreshToken)) {
                user.tokens = [];
                await user.save();
                return res.status(401).send("No refresh tokens to use")
            }else{
                user.tokens = user.tokens.filter(token => token !== refreshToken);
                await user.save()
                return res.status(200).send()
            }
        } catch (error) {
            console.log(error);
            return res.status(400).send(error.message)
        }
    });
}

const refresh = async (req: Request, res: Response) => 
{
    //extract token from header
    const authHeader = req.headers['authorization']
    const oldRefreshToken = authHeader && authHeader.split(' ')[1];
    if(oldRefreshToken == null)
    {
        return res.status(401).send("missing token");
    }
    //verify token
    jwt.verify(oldRefreshToken, process.env.REFRESH_TOKEN_SECRET, async(err, userInfo: {_id: string}) => {
        if (err) {
            return res.status(403).send(err.name); 
        }
        try {
            const user = await User.findById(userInfo._id);
            if (user == null || user.tokens == null || !user.tokens.includes(oldRefreshToken)) {
                if(user.tokens != null) {
                    user.tokens = [];
                    await user.save();
                }
                return res.status(403).send("invalid token");
            }
            //generate new refresh token
            const {accessToken, refreshToken} = generateTokens(user._id.toString())

            //update refresh token in db
            user.tokens = user.tokens.filter(token => token !== oldRefreshToken);
            user.tokens.push(refreshToken.toString())
            await user.save()

            //return new access token & new refresh token
            return res.status(200).send({'accessToken': accessToken, 'refreshToken': refreshToken.toString()})
        } catch (error) {
            console.log(error);
            return res.status(400).send(error.message)
        }
    });
    
    

    
}

export default{
    register,
    login,
    logout,
    refresh
}