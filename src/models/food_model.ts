// import mongoose, { Document, Schema } from 'mongoose';

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

import mongoose, { Document, Schema } from 'mongoose';

// Define the rating interface
interface IRating {
    userId: string; // ID of the user who rated
    rate: number; // Rating value (1 to 5)
}

export interface IRecipe {
    name: string;
    ingredients: string;
    instructions: string;
    img: string;
    ratings: IRating[]; // New field for storing user ratings
}

const RecipeSchema: Schema = new Schema({
    name: { type: String, required: true },
    ingredients: { type: String, required: true },
    instructions: { type: String, required: true },
    img: { type: String, required: true },
    ratings: [{ userId: { type: String, required: true }, rate: { type: Number, min: 1, max: 5 } }] // Array of ratings
});

const Recipe = mongoose.model<IRecipe & Document>('Recipe', RecipeSchema);
export default Recipe;
