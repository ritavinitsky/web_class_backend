import User, { IUser } from "../models/user_model";
import {Request,Response} from "express";
import BaseController from "./base_controller";
import bcrypt from "bcryptjs"

class UserController extends BaseController<IUser> {
    constructor() {
        super(User);
    }

        // Method to update password based on email
        async updatePasswordByEmail(req: Request, res: Response) {
            try {
                const { email } = req.params;
                const { password } = req.body;
    
                if (!email || !password) {
                    return res.status(400).json({ message: 'Email and password are required' });
                }
    
                // Find the user by email
                const user = await User.findOne({ email });
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
    
                // Hash the new password
                const hashedPassword = await bcrypt.hash(password, 10);
    
                // Update the user's password
                user.password = hashedPassword;
                await user.save();
    
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

export default  new UserController()