import express, { Express } from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import postRoute from "./routes/post_route";
import bodyParser from "body-parser";
import authRoute from "./routes/auth_route";
import userRoute from "./routes/user_route";
import foodRoute from "./routes/food_route"; 
import prograssRoute from "./routes/prograss_route"; 
import fileRoute from "./routes/file_route"; 
import cors from 'cors';

app.use('/uploads', express.static('uploads'));

const initApp = () => {
  const promise = new Promise<Express>((resolve) => {
    const db = mongoose.connection;
    db.on("error", (err) => console.log(err));
    db.once("open", () => console.log("Database connected"));
    mongoose.connect("mongodb+srv://ritavinitsky:Muralove999!@eatandfit.asdyajl.mongodb.net/?retryWrites=true&w=majority&appName=EatandFit").then(() => {
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(cors({
        origin: 'http://localhost:8081'
      }));
      app.get('/', (req, res) => {
        res.send('Server is up and running!');
      });

      app.use("/api/recipes", foodRoute);
      app.use("/user",userRoute);
      app.use("/post", postRoute);
      app.use("/auth", authRoute);
      app.use("/prograss", prograssRoute);
      app.use("/file", fileRoute);
      resolve(app);
    })
  });
  return promise;
};

export default initApp;