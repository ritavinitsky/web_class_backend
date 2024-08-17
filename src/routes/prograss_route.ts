import express, { Request, Response } from 'express';
import Prograss from '../models/prograss_model';


const router = express.Router();

// Get all documents with date and passed fields
router.get('/', async (req: Request, res: Response) => {
    try {
        // Fetch all documents from the Prograss collection
        const prograssRecords = await Prograss.find({}, 'date passed'); // Fetch only date and passed fields
        res.status(200).json(prograssRecords);
    } catch (error) {
        console.error("Error fetching prograss records:", error.message); // Log error
        res.status(500).send("Error fetching prograss records: " + error.message);
    }
});

// Create a new prograss record
router.post('/', async (req: Request, res: Response) => {
    try {
        const { date, passed } = req.body;
        
        // Create a new Prograss document
        const newPrograss = new Prograss({ date: new Date(date), passed });
        const savedPrograss = await newPrograss.save();

        res.status(201).json(savedPrograss);
    } catch (error) {
        console.error("Error creating prograss record:", error.message); // Log error
        res.status(500).send("Error creating prograss record: " + error.message);
    }
});

export default router;
