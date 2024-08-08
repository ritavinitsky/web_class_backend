import express, { Request, Response } from 'express';
import Recipe from '../models/food_model';

const router = express.Router();

// Get all recipes
router.get('/', async (req: Request, res: Response) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).send("Error fetching recipes: " + error.message);
    }
});

// Get a recipe by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    

    try {
        const recipe = await Recipe.findById(id);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});



// PUT route to submit or update a recipe rating
router.put('/:id/rate', async (req, res) => {
    const { id } = req.params;
    const { userId, rate } = req.body; // Expecting userId and rate in request body

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
        console.error("Error updating rating-back:", error);
        res.status(500).json({ message: 'Internal server error-back' });
    }
});

export default router;
