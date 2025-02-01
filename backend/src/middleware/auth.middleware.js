import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async(req,res,next) => {
    const token = req.cookies.jwt;
    try {
        if(!token){
            return res.status(401).json({message : "Unauthorized Request! (Token Not Found)"});
        }
        //validation of token using the jwt secret key 

        //we will decode the token using the userId as defined in generateToken method

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(404).json({message : "Unauthorized Request- Invalid Token"});
        }

        const user = await User.findById(decoded.userId).select("-password"); //not sending the pswd to the client due to security reasons

        if(!user){
            return res.status(401).json({message : "User not found! Kindly Sign Up"});
        }

        //if the user is authenticated 
        //add the user to the req
        //call the next() func to 
        req.user = user;

        next();

    } catch (error) {
        console.log(`Error in the middleware authentication ${error.message}`);
        return res.status(500).json({message: "Internal Server Error"});
    }
}