import express, { Request, Response } from 'express';
import Recipe from '../models/food_model';

const router = express.Router();

// Get all recipes
router.get('/', async (req: Request, res: Response) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).json(recipes);
    } catch (error) {
        console.error("Error fetching recipes:", error.message); // Log error
        res.status(500).send("Error fetching recipes: " + error.message);
    }
});

// Get a recipe by ID
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log('Received request for recipe ID:', id); // Log the ID

    try {
        const recipe = await Recipe.findById(id);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.status(200).json(recipe);
    } catch (error) {
        console.error("Error fetching recipe by ID:", error.message); // Log error
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PUT route to submit or update a recipe rating
router.put('/:id/rate', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId, rate } = req.body; // Expecting userId and rate in request body
    console.log(`Received rating request for recipe ID: ${id} from user ID: ${userId} with rate: ${rate}`); // Log the ID and user ID

    if (!userId || rate < 1 || rate > 5) {
        return res.status(400).json({ message: 'Invalid input' });
    }

    try {
        // Find the recipe by ID
        const recipe = await Recipe.findById(id);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        // Check if the user has already rated this recipe
        const existingRating = recipe.ratings.find(r => r.userId === userId);
        if (existingRating) {
            // Update the existing rating
            existingRating.rate = rate;
        } else {
            // Add a new rating
            recipe.ratings.push({ userId, rate });
        }

        // Save the updated recipe
        await recipe.save();
        res.status(200).json(recipe);
    } catch (error) {
        console.error("Error updating rating:", error.message); // Log error
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
