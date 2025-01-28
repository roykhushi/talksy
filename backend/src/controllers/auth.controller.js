import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../lib/utils.js";

export const signup = async (req,res) => {
    const {fullName,email,password} = req.body;
    try {
        //sign up the user
        //hash their pswd
        //generate a token to let users know they have been signed up
        if(!fullName || !email || !password){
            return res.status(400).json({message : "All the fields are necessary!"});
        }
        if(password.length < 6){
            return res.status(400).json({message : "Password Must be atleast 6 characters!"});
        }
        const user = await User.findOne({email});

        if(user){
            return res.status(400).json({message: "User already exists!"});
        }

        //hashing the password 
        const salt = await bcrypt.genSalt(10); //Salting involves adding a random value (called the "salt") to the original password before hashing it. This ensures that even if two users happen to have the same password, their hashed values will be different because of the unique salt added to each one.

        const hashedPassword = await bcrypt.hash(password,salt);

        //saving user to the DB
        const newUser = new User({
            fullName:fullName,
            password:hashedPassword,
            email:email
        });

        if(newUser){
            //generate jwt token
            generateToken(newUser._id,res);
            newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            })
        }else{
            return res.status(400).json({message : "Invalid User Data!"});
        }

        
        
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({message : "Internal Server Error"}); 
    }
};

export const login = (req,res) => {
    res.send("Login Route");
};

export const logout = (req,res) => {
    res.send("Logout Route");
};