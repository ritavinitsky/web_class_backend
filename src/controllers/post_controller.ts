import BaseController from "./base_controller";
import Post, { IPost } from "../models/post_model";
import User, { IUser } from "../models/user_model";
import { Request, Response } from "express";
const fs = require('fs');

class PostController extends BaseController<IPost> {
    constructor() {
        super(Post);
    }

    async get(req: Request, res: Response) {
        console.log("get " + req.query.creator_id);
        try {
          if (req.query.creator_id) {
            const item = await Post.find({ creator_id: req.query.creator_id });
            item.forEach(function(elem){
              if(elem.imgUrl != ""){
                var imgContent = "";
                try {
                  imgContent = fs.readFileSync(elem.imgUrl, 'base64');
                  imgContent = "data:image/png;base64," + imgContent;
                } catch (err) {
                  // console.error(err);
                }
                elem.imgContent = imgContent;
              }
            })
            return res.status(200).send(item);
          } else {
            const item = await Post.find();
            item.forEach(function(elem){
              if(elem.imgUrl != ""){
                var imgContent = "";
                try {
                  imgContent = fs.readFileSync(elem.imgUrl, 'base64');
                  imgContent = "data:image/png;base64," + imgContent;
                } catch (err) {
                  // console.error(err);
                }
                elem.imgContent = imgContent;
              }
            })
            return res.status(200).send(item);
          }
        } catch (error) {
          console.log(error);
          res.status(400).send(error.message);
        }
      }

    async post(req: Request, res: Response) {
        req.body.creator_id = req.body.user._id;
        super.post(req, res);
    }

    async put(req: Request, res: Response) {
        let item = await this.ItemModel.findById(req.params.id)
        item.post_title = req.body.post_title
        item.post_text = req.body.post_text
        item.imgUrl = req.body.imgUrl
        req.body = item
        super.post(req, res);
    }
}

export default new PostController()