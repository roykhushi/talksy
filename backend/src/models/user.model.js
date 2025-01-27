import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type:String,
        required: true,
        unique: true
    },
    fullName:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required: true,
        minlength: 6
    },
    profilePic:{
        type: String,
        default:"",
    },
},{timestamps: true} //to get the createdAt nd updatedAt fields
);

const User = mongoose.model("User",userSchema); //mongodb convention -> User == first letter as capital & singular noun

export default User;