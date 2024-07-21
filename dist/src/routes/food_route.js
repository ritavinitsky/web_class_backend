"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const food_model_1 = __importDefault(require("../models/food_model"));
const router = express_1.default.Router();
// Add sample recipes (run once to populate the database)
router.post('/addSampleRecipes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sampleRecipes = [
        {
            // img: "../pancake.jpg",
            name: "Pasta Carbonara",
            ingredients: "Pasta, Eggs, Pancetta, Parmesan cheese, Black pepper",
            instructions: "Boil pasta. Cook pancetta. Mix eggs and cheese. Combine all with pasta and pancetta."
        }
    ];
    try {
        yield food_model_1.default.insertMany(sampleRecipes);
        res.status(200).send("Sample recipes added");
    }
    catch (error) {
        res.status(500).send("Error adding sample recipes: " + error.message);
    }
}));
// Get all recipes
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipes = yield food_model_1.default.find();
        res.status(200).json(recipes);
    }
    catch (error) {
        res.status(500).send("Error fetching recipes: " + error.message);
    }
}));
exports.default = router;
//# sourceMappingURL=food_route.js.map