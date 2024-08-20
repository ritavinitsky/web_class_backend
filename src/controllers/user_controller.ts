import User, { IUser } from "../models/user_model";
import { Request, Response } from "express";
import BaseController from "./base_controller";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import bcrypt from "bcryptjs";

class UserController extends BaseController<IUser> {
    constructor() {
        super(User);
    }

    async getByEmail(req: Request, res: Response) {
        const { email } = req.params;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        try {
            console.log(`Finding user by email: ${email}`);
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            console.log('User found:', user);
            res.status(200).json(user);
        } catch (err) {
            console.error('Error fetching user by email:', err);
            res.status(500).send(err.message);
        }
    }

    async updatePasswordByEmail(req: Request, res: Response) {
        console.log("update password by email");
        const { password } = req.body;
        const { email } = req.params;
    
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
    
        try {
            console.log(`Finding user by email: ${email}`);
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            console.log('User found:', user);
    
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log('Hashed password:', hashedPassword);
    
            user.password = hashedPassword;
            await user.save();
    
            console.log('User updated successfully');

             // Setup email transport
             const transporter = nodemailer.createTransport({
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
             await transporter.sendMail(mailOptions);
             console.log('Email sent successfully');
            res.status(200).json({ message: 'Password updated successfully' });
        } catch (err) {
            console.error('Error updating password:', err);
            res.status(500).send(err.message);
        }
    }
    

    async put(req: Request, res: Response) {
        try{
            console.log("update user id: " + req.params.id)
            let item = await User.findById(req.params.id)
            item.name = req.body.name;
            item.email = req.body.email;
            item.age = req.body.age;
            item.dailyCal = req.body.dailyCal;
            //item.imgUrl = req.body.imgUrl;
            req.body = item;
            super.put(req, res);
            console.log(item.dailyCal)
        }catch(err){
            console.log("The error in updating user is: " + err)
            res.status(400).send(err.message);
        }
    }

}

export default new UserController();
