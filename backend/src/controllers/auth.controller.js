import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req,res) => {
    const {fullName,email,password} = req.body; //getting these info from the frontend 
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
        //finding existing user in db
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

export const login = async(req,res) => {
    const {email, password} = req.body;
    try {
        //finding the user using his email
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message : "Invalid Credentials"});
        }

        //if email matches then compare the inp pswd w the hashed one
        const isPasswordOk = await bcrypt.compare(password,user.password);

        if(!isPasswordOk){
            return res.status(400).json({message : "Invalid Credentials"});
        }

        //if everything matches then generate a token
        generateToken(user._id,res);

        //sending user data back to the client
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        })
        res.send

    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
};

export const logout = (req,res) => {
    try {
        //clearing the cookies after logging out
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({message : "Logged out successfully"});
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
};

export const updateProfile = async(req,res) => {
    try {
        const {profilePic} = req.body;
        const userId = req.user._id; // we can extract the user id bcz in middleware we're sending the user to the req is the user has been authenticated using the protectRoute middleware

        if(!profilePic){
            return res.status(400).json({message: "Profile picture is required!"});
        }

        //uploading the profile pic to the cloudinary bucket 
        const uploadedResp = await cloudinary.uploader.upload(profilePic);
        
        //updating the profile pic of the user in the db
        const updatedUser = await User.findByIdAndUpdate(userId,{profilePic: uploadedResp.secure_url}, {new : true});
        //new : true is imp 

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log(`Error in updating profile ${error.message}`);
        return res.status(500).json({message: "Internal Server Error"});
    }   
}

export const checkAuth = (req,res) => { //to check user is authenticated or not
    try {
        return res.status(200).json(req.user);
    } catch (error) {
        console.log(`Error in check auth controller ${error.message}`);
        return res.status(500).json({message: "Internal Server Error"});
    }
} 