import mongoose, { Document, Schema } from 'mongoose';

export interface IRecipe {
    name: string;
    ingredients: string;
    instructions: string;
    img: string;
}

const RecipeSchema: Schema = new Schema({
    name: { type: String, required: true },
    ingredients: { type: String, required: true },
    instructions: { type: String, required: true },
    img: { type: String, required: true },
});

const Recipe = mongoose.model<IRecipe & Document>('Recipe', RecipeSchema);
export default Recipe;
