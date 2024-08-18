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
const base_controller_1 = __importDefault(require("./base_controller"));
const post_model_1 = __importDefault(require("../models/post_model"));
const fs = require('fs');
class PostController extends base_controller_1.default {
    constructor() {
        super(post_model_1.default);
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("get " + req.query.creator_id);
            try {
                if (req.query.creator_id) {
                    const item = yield post_model_1.default.find({ creator_id: req.query.creator_id });
                    item.forEach(function (elem) {
                        if (elem.imgUrl != "") {
                            var imgContent = "";
                            try {
                                imgContent = fs.readFileSync(elem.imgUrl, 'base64');
                                imgContent = "data:image/png;base64," + imgContent;
                            }
                            catch (err) {
                                // console.error(err);
                            }
                            elem.imgContent = imgContent;
                        }
                    });
                    return res.status(200).send(item);
                }
                else {
                    const item = yield post_model_1.default.find();
                    item.forEach(function (elem) {
                        if (elem.imgUrl != "") {
                            var imgContent = "";
                            try {
                                imgContent = fs.readFileSync(elem.imgUrl, 'base64');
                                imgContent = "data:image/png;base64," + imgContent;
                            }
                            catch (err) {
                                // console.error(err);
                            }
                            elem.imgContent = imgContent;
                        }
                    });
                    return res.status(200).send(item);
                }
            }
            catch (error) {
                console.log(error);
                res.status(400).send(error.message);
            }
        });
    }
    post(req, res) {
        const _super = Object.create(null, {
            post: { get: () => super.post }
        });
        return __awaiter(this, void 0, void 0, function* () {
            req.body.creator_id = req.body.user._id;
            _super.post.call(this, req, res);
        });
    }
    put(req, res) {
        const _super = Object.create(null, {
            post: { get: () => super.post }
        });
        return __awaiter(this, void 0, void 0, function* () {
            let item = yield this.ItemModel.findById(req.params.id);
            item.post_title = req.body.post_title;
            item.post_text = req.body.post_text;
            item.imgUrl = req.body.imgUrl;
            req.body = item;
            _super.post.call(this, req, res);
        });
    }
}
exports.default = new PostController();
//# sourceMappingURL=post_controller.js.map