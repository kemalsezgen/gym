import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import * as doteenv from 'dotenv';
doteenv.config()
import cookieParser from "cookie-parser";

//import postRoutes from "./routes/PostRoutes.js"
//import userRoutes from "./routes/UserRoutes.js"
import authRoutes from "./routes/auth.js";
import privateRoutes from "./routes/private.js";

const app = express();

mongoose.set('strictQuery', false);
app.use(bodyParser.json({ limit: "30mb"}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true, //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.use('/auth', authRoutes);
app.use('/private', privateRoutes);

// MongoDB connection
mongoose.connect(process.env.DATABASE_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error));