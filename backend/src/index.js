import express from "express";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json()); //it will extract the contents of the body in json format

//building routes

//authentication route
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
    connectDB();
})