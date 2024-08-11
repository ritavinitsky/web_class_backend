"use strict";
// import mongoose, { Document, Schema } from 'mongoose';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// export interface IRecipe {
//     name: string;
//     ingredients: string;
//     instructions: string;
//     img: string;
// }
// const RecipeSchema: Schema = new Schema({
//     name: { type: String, required: true },
//     ingredients: { type: String, required: true },
//     instructions: { type: String, required: true },
//     img: { type: String, required: true },
// });
// const Recipe = mongoose.model<IRecipe & Document>('Recipe', RecipeSchema);
// export default Recipe;
const mongoose_1 = __importStar(require("mongoose"));
const RecipeSchema = new mongoose_1.Schema({
    ingredients: { type: String, required: true },
    instructions: { type: String, required: true },
    name: { type: String, required: true },
    img: { type: String, required: true },
    // cal:{ type: String, required: true },
    // isVegan: { type: boolean, required: false },
    // isVegetarian: { type: boolean, required: false },
    ratings: [{ userId: { type: String, required: true }, rate: { type: Number, min: 1, max: 500 } }] // Array of ratings
});
const Recipe = mongoose_1.default.model('Recipe', RecipeSchema);
exports.default = Recipe;
//# sourceMappingURL=food_model.js.map