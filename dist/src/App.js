"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
//import studentRoute from "./routes/student_route";
const post_route_1 = __importDefault(require("./routes/post_route"));
const body_parser_1 = __importDefault(require("body-parser"));
const auth_route_1 = __importDefault(require("./routes/auth_route"));
const user_route_1 = __importDefault(require("./routes/user_route"));
const food_route_1 = __importDefault(require("./routes/food_route"));
const prograss_route_1 = __importDefault(require("./routes/prograss_route"));
const cors_1 = __importDefault(require("cors"));
const initApp = () => {
    const promise = new Promise((resolve) => {
        const db = mongoose_1.default.connection;
        db.on("error", (err) => console.log(err));
        db.once("open", () => console.log("Database connected"));
        mongoose_1.default.connect("mongodb+srv://ritavinitsky:Muralove999!@eatandfit.asdyajl.mongodb.net/?retryWrites=true&w=majority&appName=EatandFit").then(() => {
            app.use(body_parser_1.default.json());
            app.use(body_parser_1.default.urlencoded({ extended: true }));
            app.use((0, cors_1.default)({
                origin: 'http://localhost:8081'
            }));
            app.get('/', (req, res) => {
                res.send('Server is up and running!');
            });
            //app.use("/student", studentRoute);
            app.use("/api/recipes", food_route_1.default);
            app.use("/user", user_route_1.default);
            app.use("/post", post_route_1.default);
            app.use("/auth", auth_route_1.default);
            app.use("/prograss", prograss_route_1.default);
            resolve(app);
        });
    });
    return promise;
};
exports.default = initApp;
//# sourceMappingURL=App.js.map