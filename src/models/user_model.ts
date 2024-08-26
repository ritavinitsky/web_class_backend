import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for input records
interface IInputRecord {
    food: string;
    cal: string;
    date: string; // Change from Date to string
}

// Define the interface for star ratings
interface IStarRating {
    recipeId: string; // Assume recipe ID is a string
    stars: number; // Star count ranging from 1 to 5
}

export interface IUser extends Document {
    name: string;
    email: string;
    age: string;
    password: string;
    dailyCal: string;
    remaningCal: number;
    inputRecords: IInputRecord[];
    waterCups: string[];
    weeks: number;
    days: number;
    starRatings: IStarRating[];
    tokens: string[];
}

// Define the input record schema
const inputRecordSchema = new Schema<IInputRecord>({
    food: {
        type: String,
        required: true
    },
    cal: {
        type: String,
        required: true
    },
    date: {
        type: String, // Change from Date to String
        required: true
    }
});

// Define the user schema
const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dailyCal: {
        type: String
    },
    remaningCal: {
        type: Number,
        default: 0
    },
    inputRecords: [inputRecordSchema],
    waterCups: {
        type: [String],
        default: Array(8).fill('blue') // or any default value you prefer
    },
    weeks:{
        type: Number,
        default: 0
    },
    days:{
        type: Number,
        default: 0
    },
    tokens: {
        type: [String],
        default: []
    },
    starRatings: [{ // Update this section
        recipeId: {
            type: String,
            required: true
        },
        stars: {
            type: Number,
            required: true,
        }
    }]
});

// Middleware to format date as YYYY-MM-DD before saving
inputRecordSchema.pre('save', function (next) {
    if (this.date) {
        const date = new Date(this.date);
        this.date = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    }
    next();
});

export default mongoose.model<IUser>('User', userSchema);
