"use strict";
/*import mongoose from "mongoose";

export interface IPost {
    title: string;
    message: string;
    owner: string;
}

const postSchema = new mongoose.Schema<IPost>({
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
});

export default mongoose.model<IPost>("Post", postSchema);
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const post_schema = new mongoose_1.default.Schema({
    creator_id: {
        type: String,
        required: true
    },
    post_title: {
        type: String,
        required: true
    },
    post_text: {
        type: String,
        required: true
    }
    //imgUrl: {
    //    type: String,
    //   required: true
    // }
});
exports.default = mongoose_1.default.model("Post", post_schema);
//# sourceMappingURL=post_model.js.map