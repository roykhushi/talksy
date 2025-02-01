import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json()); //it will extract the contents of the body in json format
app.use(cookieParser()); //parsing the cookie to extract the jwt

//building routes

//authentication route
app.use("/api/auth", authRoutes);
app.use("api/auth/message", messageRoutes);

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
    connectDB();
})