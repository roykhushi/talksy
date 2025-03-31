import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { app,server } from "./lib/socket.js";
dotenv.config();


const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json({ limit: '50mb' })); //it will extract the contents of the body in json format
app.use(cookieParser()); //parsing the cookie to extract the jwt
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

//building routes

//authentication route
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

//if we're in prod then make this dist folder as the static assest
//running both the frontend and backend in same place
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req,res) => {
        res.sendFile(path.join(__dirname,"../frontend", "dist", "index.html")); //run react app
    })
}

server.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
    connectDB();
})