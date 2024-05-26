import User, { IUser } from "../models/user_model";
import {Request,Response} from "express";
import BaseController from "./base_controller";
import bcrypt from "bcrypt"

class UserController extends BaseController<IUser> {
    constructor() {
        super(User);
    }

    async put(req: Request, res: Response) {
        try{
            console.log("update user id: " + req.params.id)
            let item = await User.findById(req.params.id)
            item.name = req.body.name;
            item.email = req.body.email;
            item.age = req.body.age;
            //item.imgUrl = req.body.imgUrl;
            req.body = item;
            super.put(req, res);
        }catch(err){
            console.log("The error in updating user is: " + err)
            res.status(400).send(err.message);
        }
    }
}

export default  new UserController()