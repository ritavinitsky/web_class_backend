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
const prograss_model_1 = __importDefault(require("../models/prograss_model"));
const router = express_1.default.Router();
// Get all documents with date and passed fields
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prograssRecords = yield prograss_model_1.default.find({}, 'date passed');
        res.status(200).json(prograssRecords);
    }
    catch (error) {
        console.error("Error fetching prograss records:", error.message);
        res.status(500).send("Error fetching prograss records: " + error.message);
    }
}));
// Create a new prograss record
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date, passed } = req.body;
        const newPrograss = new prograss_model_1.default({ date: new Date(date), passed });
        const savedPrograss = yield newPrograss.save();
        res.status(201).json(savedPrograss);
    }
    catch (error) {
        console.error("Error creating prograss record:", error.message);
        res.status(500).send("Error creating prograss record: " + error.message);
    }
}));
exports.default = router;
//# sourceMappingURL=prograss_route.js.map