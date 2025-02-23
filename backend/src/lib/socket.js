import {Server} from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin: ['http://localhost:5173'],
    }
})
const socketUserMap = {}; //for storing online users in format of {userId: socketId}
//socket connection listening for incoming req
io.on("connection", (socket) => {
    console.log(`A user has connected ${socket.id}`);

    const userId = socket.handshake.query.userId;
    if(userId){
        socketUserMap[userId] = socket.id;
    }

    //broadcast to other users about all the events like online or offline users
    io.emit("getOnlineUsers",Object.keys(socketUserMap));

    socket.on("disconnect", () => {
        console.log(`A user has disconnected ${socket.id}`);
        delete socketUserMap[userId];
        io.emit("getOnlineUsers",Object.keys(socketUserMap));
    })
});

export function sendSocketIdOfUser(userId) {
    return socketUserMap[userId];
}


export {io,app,server};