import cloudinary from "../lib/cloudinary.js";
import { sendSocketIdOfUser } from "../lib/socket.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { io } from "../lib/socket.js";
//this func will find all the users except the loggedIn user in the side bar of the application
export const getUsersForSidebar = async(req,res) => {   
    try {
        //1st get the logged in user
        const loggedInUser = req.user._id; //since this func has been protected using the middleware, we can get the user id in the req on client side
        const filteredUsers = await User.find({_id: {$ne: loggedInUser}}).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log(`Error in the message controller ${error.message}`);
        res.status(500).json({message: "Internal Server Error"});
    }
}

//this function will get all the messages in the chronological order
export const getMessages = async(req,res) => {
    try {
        const {id: otherUserId} = req.params;
        const myId = req.user._id;

        //getting all the messages b/w these 2 users
        const messages = await Message.find({
            $or: [
                {senderId:myId , receiverId:otherUserId},
                {senderId:otherUserId, receiverId:myId},
            ],
        });

        res.status(200).json(messages);
    } catch (error) {
        console.log(`Error in message controller ${error.message}`);
        res.status(500).json({message: "Internal Server Error"});
    }
}


export const sendMessage = async(req,res) => {
    try {
        const {text,image} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;

        if(image){
            //upload the base64 image to cloudinary
            const uploadResp = await cloudinary.uploader.upload(image);
            imageUrl = uploadResp.secure_url; 
        };

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });

        //save this msg in db
        await newMessage.save();

        const socketIdofReceiver = sendSocketIdOfUser(receiverId);

        if(sendSocketIdOfUser){
            io.to(socketIdofReceiver).emit("newMessage",newMessage); //sending 1v1 msg to the receiver
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.log(`error in message controller ${error.message}`);
        res.status(500).json({message:"Internal Server Error"});   
    }
}