import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import * as doteenv from 'dotenv';
doteenv.config()
//import cookieParser from "cookie-parser";

//import postRoutes from "./routes/PostRoutes.js"
//import userRoutes from "./routes/UserRoutes.js"
//import authRoutes from "./routes/AuthRoutes.js";

const app = express();

app.get("/", (req, res) => {
    res.send("2123");
})

mongoose.set('strictQuery', false);
app.use(bodyParser.json({ limit: "30mb"}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
//app.use(cookieParser());

const PORT = process.env.PORT || 5000;

//app.use('/posts', postRoutes);
//app.use('/user', userRoutes);
//app.use('/auth', authRoutes);

// MongoDB connection
mongoose.connect(process.env.DATABASE_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error));