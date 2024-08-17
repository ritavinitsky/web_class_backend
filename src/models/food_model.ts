import mongoose, { Document, Schema } from 'mongoose';

// Define the rating interface
interface IRating {
    userId: string; // ID of the user who rated
    rate: number; // Rating value (1 to 5)
}

export interface IRecipe {
    ingredients: string;
    instructions: string;
    name: string;
    img: string;
    // cal:number;
    // isVegan: boolean;
    // isVegetarian: boolean;
    ratings: IRating[]; // New field for storing user ratings
}

const RecipeSchema: Schema = new Schema({
    ingredients: { type: String, required: true },
    instructions: { type: String, required: true },
    name: { type: String, required: true },
    img: { type: String, required: true },
    // cal:{ type: String, required: true },
    // isVegan: { type: boolean, required: false },
    // isVegetarian: { type: boolean, required: false },
    ratings: [{ userId: { type: String, required: true }, rate: { type: Number, min: 1, max: 500 } }] // Array of ratings
});

const Recipe = mongoose.model<IRecipe & Document>('Recipe', RecipeSchema);
export default Recipe;
