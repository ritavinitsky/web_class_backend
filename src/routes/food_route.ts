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

export default router;
