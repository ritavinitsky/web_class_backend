import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for input records
interface IInputRecord {
    food: string;
    cal: number;
    date: Date;
}

export interface IUser extends Document {
    name: string;
    email: string;
    age: string;
    password: string;
    dailyCal: string;
    remaningCal: number;
    inputRecords: IInputRecord[];
    tokens: string[];
}

// Define the input record schema
const inputRecordSchema = new Schema<IInputRecord>({
    food: {
        type: String,
        required: true
    },
    cal: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
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
    tokens: {
        type: [String],
        default: []
    }
});

export default mongoose.model<IUser>('User', userSchema);
