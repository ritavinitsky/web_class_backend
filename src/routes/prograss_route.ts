import express, { Request, Response } from 'express';
import Prograss from '../models/PrograssModel'; 

const router = express.Router();

// Get all documents with date and passed fields
router.get('/', async (req: Request, res: Response) => {
    try {
        const prograssRecords = await Prograss.find({}, 'date passed userId');
        res.status(200).json(prograssRecords);
    } catch (error) {
        console.error("Error fetching prograss records:", error.message);
        res.status(500).send("Error fetching prograss records: " + error.message);
    }
});

// Create a new prograss record
router.post('/', async (req: Request, res: Response) => {
    try {
        const { date, passed, userId } = req.body;
        const newPrograss = new Prograss({ date: new Date(date), passed, userId });
        const savedPrograss = await newPrograss.save();
        res.status(201).json(savedPrograss);
    } catch (error) {
        console.error("Error creating prograss record:", error.message);
        res.status(500).send("Error creating prograss record: " + error.message);
    }
});

export default router;
