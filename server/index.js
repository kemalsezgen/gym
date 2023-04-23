import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import * as doteenv from 'dotenv';
doteenv.config()
import cookieParser from "cookie-parser";

//routes 
import postRoutes from "./routes/posts.js"
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js"
import chatRoutes from "./routes/chat.js";
import messageRoutes from "./routes/message.js";

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
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/chat', chatRoutes);
app.use('/message', messageRoutes);

// MongoDB connection
mongoose.connect(process.env.DATABASE_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error));