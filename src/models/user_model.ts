import mongoose from "mongoose";

export interface IUser {
    name: string;
    email: string;
    age: string;
    // imgUrl: string;
    password: string;
    dailyCal: string;
    remainingCal:string;
    tokens: string[];
  }

const user_schema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
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
    remainingCal: {
        type: String
    },
    tokens: {
        type: [String]
    }
})
export default mongoose.model<IUser>("User", user_schema)