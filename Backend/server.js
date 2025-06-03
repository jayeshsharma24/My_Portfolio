import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import dataRoute from "../Backend/dataRoute.js";
import createAuthRoutes from "./routes/authRoutes.js"; 

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connection to Portfolio_Data
const portfolioDb = mongoose.createConnection('mongodb://localhost:27017/Portfolio_Data', {
});
portfolioDb.once('open', () => console.log('Connected to Portfolio_Data'));

// Connection to Auth_Data
const authDb = mongoose.createConnection('mongodb://localhost:27017/Auth_Data', {
});
authDb.once('open', () => console.log('Connected to Auth_Data'));

// Routes
app.use('/data', dataRoute(portfolioDb)); // contact form routes
app.use('/api/auth', createAuthRoutes(authDb)); // auth routes injected with db

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
