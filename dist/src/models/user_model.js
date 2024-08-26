"use strict";
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
const mongoose_1 = __importStar(require("mongoose"));
// Define the input record schema
const inputRecordSchema = new mongoose_1.Schema({
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
const userSchema = new mongoose_1.Schema({
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
    weeks: {
        type: Number,
        default: 0
    },
    days: {
        type: Number,
        default: 0
    },
    tokens: {
        type: [String],
        default: []
    },
    starRatings: [{
            recipeId: {
                type: String,
                required: true
            },
            stars: {
                type: [Number],
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
exports.default = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=user_model.js.map