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
// Get all recipes
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipes = yield food_model_1.default.find();
        res.status(200).json(recipes);
    }
    catch (error) {
        console.error("Error fetching recipes:", error.message); // Log error
        res.status(500).send("Error fetching recipes: " + error.message);
    }
}));
// Get a recipe by ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log('Received request for recipe ID:', id); // Log the ID
    try {
        const recipe = yield food_model_1.default.findById(id);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.status(200).json(recipe);
    }
    catch (error) {
        console.error("Error fetching recipe by ID:", error.message); // Log error
        res.status(500).json({ message: 'Internal server error' });
    }
}));
// PUT route to submit or update a recipe rating
router.put('/:id/rate', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { userId, rate } = req.body; // Expecting userId and rate in request body
    console.log(`Received rating request for recipe ID: ${id} from user ID: ${userId} with rate: ${rate}`); // Log the ID and user ID
    if (!userId || rate < 1 || rate > 5) {
        return res.status(400).json({ message: 'Invalid input' });
    }
    try {
        // Find the recipe by ID
        const recipe = yield food_model_1.default.findById(id);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        // Check if the user has already rated this recipe
        const existingRating = recipe.ratings.find(r => r.userId === userId);
        if (existingRating) {
            // Update the existing rating
            existingRating.rate = rate;
        }
        else {
            // Add a new rating
            recipe.ratings.push({ userId, rate });
        }
        // Save the updated recipe
        yield recipe.save();
        res.status(200).json(recipe);
    }
    catch (error) {
        console.error("Error updating rating:", error.message); // Log error
        res.status(500).json({ message: 'Internal server error' });
    }
}));
exports.default = router;
//# sourceMappingURL=food_route.js.map