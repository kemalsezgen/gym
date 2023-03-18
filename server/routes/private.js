import express from "express";
import { checkAuth } from "../middlewares/checkAuth.js";

const router = express.Router();

router.get('/', checkAuth, (req, res) => {
    res.json("Welcome the private area.")
})

export default router;