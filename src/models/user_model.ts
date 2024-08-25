// import mongoose, { Schema, Document } from 'mongoose';

// // Define the interface for input records
// interface IInputRecord {
//     food: string;
//     cal: string;
//     date: string; // Change from Date to string
// }

// export interface IUser extends Document {
//     name: string;
//     email: string;
//     age: string;
//     password: string;
//     dailyCal: string;
//     remaningCal: number;
//     inputRecords: IInputRecord[];
//     waterCups: string[];
//     tokens: string[];
// }

// // Define the input record schema
// const inputRecordSchema = new Schema<IInputRecord>({
//     food: {
//         type: String,
//         required: true
//     },
//     cal: {
//         type: String,
//         required: true
//     },
//     date: {
//         type: String, // Change from Date to String
//         required: true
//     }
// });

// // Define the user schema
// const userSchema = new Schema<IUser>({
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     age: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     dailyCal: {
//         type: String
//     },
//     remaningCal: {
//         type: Number,
//         default: 0
//     },
//     inputRecords: [inputRecordSchema],
//      waterCups: {
//         type: [String],
//         default: Array(8).fill('blue')
//     }
//     tokens: {
//         type: [String],
//         default: []
//     }
// });

// // Middleware to format date as YYYY-MM-DD before saving
// inputRecordSchema.pre('save', function (next) {
//     if (this.date) {
//         const date = new Date(this.date);
//         this.date = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
//     }
//     next();
// });

// export default mongoose.model<IUser>('User', userSchema);

import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for input records
interface IInputRecord {
    food: string;
    cal: string;
    date: string; // Change from Date to string
}

// Define the interface for water colors
interface IWaterColor {
    color: string;
    date: string; // Date in YYYY-MM-DD format
}

export interface IUser extends Document {
    name: string;
    email: string;
    age: string;
    password: string;
    dailyCal: string;
    remaningCal: number;
    inputRecords: IInputRecord[];
    waterCups: IWaterColor[]; // Updated to use IWaterColor interface
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

// Define the water color schema
const waterCupschema = new Schema<IWaterColor>({
    color: {
        type: String,
        default: 'blue'
    },
    date: {
        type: String,
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
    waterCups:[waterCupschema],
    tokens: {
        type: [String],
        default: []
    }
});

// Middleware to format date as YYYY-MM-DD before saving input records
waterCupschema.pre('save', function (next) {
    if (this.date) {
        const date = new Date(this.date);
        this.date = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    }
    next();
});

// Middleware to format date as YYYY-MM-DD before saving input records
inputRecordSchema.pre('save', function (next) {
    if (this.date) {
        const date = new Date(this.date);
        this.date = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    }
    next();
});

export default mongoose.model<IUser>('User', userSchema);
