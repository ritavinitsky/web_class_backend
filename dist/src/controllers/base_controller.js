"use strict";
/*import { Request, Response } from "express";
import mongoose from "mongoose";

class BaseController<ModelType> {
    itemModel: mongoose.Model<ModelType>;
    constructor(itemModel: mongoose.Model<ModelType>) {
        this.itemModel = itemModel;
    }
    async get(req: Request, res: Response) {
        console.log("get");
        try {
            if (req.query.name) {
                const item = await this.itemModel.find({ name: req.query.name });
                res.status(200).send(item);
            } else {
                const item = await this.itemModel.find();
                res.status(200).send(item);
            }
        } catch (error) {
            console.log(error);
            res.status(400).send(error.message);
        }
    }

    async getById(req: Request, res: Response) {
        console.log(req.params);
        try {
            const item = await this.itemModel.findById(req.params.id);
            if (!item) {
                return res.status(404).send("not found");
            } else {
                return res.status(200).send(item);
            }
        } catch (error) {
            console.log(error);
            res.status(400).send(error.message);
        }
    }

    async post(req: Request, res: Response) {
        console.log("student post ");
        try {
            const student = await this.itemModel.create(req.body);
            res.status(201).send(student);
        } catch (error) {
            console.log(error);
            res.status(400).send(error.message);
        }
    }

    //updatye a sudent with the given id
    put(req: Request, res: Response) {
        console.log("student put");
        res.status(400).send("Not implemented");
    }

    async remove(req: Request, res: Response) {
        console.log("student delete");
        try {
            await this.itemModel.findByIdAndDelete(req.params.id);
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            res.status(400).send(error.message);
        }
    }
}

export default BaseController;
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class BaseController {
    constructor(ItemModel) {
        this.ItemModel = ItemModel;
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("get");
            try {
                if (req.query.name) {
                    const item = yield this.ItemModel.find({ name: req.query.name });
                    return res.status(200).send(item);
                }
                else {
                    const item = yield this.ItemModel.find();
                    return res.status(200).send(item);
                }
            }
            catch (error) {
                console.log(error);
                res.status(400).send(error.message);
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params);
            try {
                const item = yield this.ItemModel.findById(req.params.id);
                return res.status(200).send(item);
            }
            catch (error) {
                console.log(error);
                res.status(400).send(error.message);
            }
        });
    }
    post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const item = yield this.ItemModel.create(req.body);
                res.status(201).send(item);
            }
            catch (error) {
                console.log(error);
                res.status(400).send(error.message);
            }
        });
    }
    //implemented (works with implementations in derived classes)
    put(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield req.body.save();
                res.status(201).send(req.body);
            }
            catch (error) {
                console.log(error);
                res.status(400).send(error.message);
            }
        });
    }
    remove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.ItemModel.findByIdAndDelete(req.params.id);
                res.status(201).send();
            }
            catch (error) {
                console.log(error);
                res.status(400).send(error.message);
            }
        });
    }
}
exports.default = BaseController;
//# sourceMappingURL=base_controller.js.map