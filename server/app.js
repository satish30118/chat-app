const express = require("express");
const dotenv = require("dotenv");
const userRoute = require("./Router/router");
const chatRoute = require("./Router/chatRouter");
const messageRoute = require("./Router/messageRoute");

const app = express();
dotenv.config({ path: "./config.env" });
const database = require("./db/connection");
// const { Socket } = require("socket.io");
app.use(express.json());
app.use("/api/user",userRoute);
app.use("/api/chat", chatRoute);
app.use("/api/message", messageRoute);



const PORT = process.env.PORT || 5000;









const server = app.listen(PORT,() => {
    console.log(`server run at ${PORT}`)
})

// const io = require("socket.io")(server,{
//     pingTimeout:60000,
//     cors:{
//         origin:"http://localhost:3000",
//     }
// });

// io.on("connection", (socket) =>{
//     console.log("Connected to socket.io");
//     socket.on('setup', (userData)=>{
//         socket.join(userData._id);
//         // console.log(userData._id)
//         socket.emit("connected");
//     });

//     socket.on('join chat', (room) => {
//         socket.join(room);
//         console.log("User Join Room:- " + room)
//     });

//     socket.on('typing',(room) => {
//         socket.in(room).emit("typing")
//     })
//     socket.on('stop typing',(room) => {
//         socket.in(room).emit("stop typing")
//     })

    

//     socket.on('new message', (newMessageRecieved) => {
//         var chat = newMessageRecieved.chat;

//         if(!chat.users) return console,log("chat.users not defined");

//         chat.users.forEach(user => {
//             if(user._id == newMessageRecieved.sender._id) return;

//             socket.in(user._id).emit("message recieved", newMessageRecieved);
//         });
//     });

//     socket.off("setup", ()=>{
//         console.log("USER DISCONNECTED");
//         socket.leave(userData._id)
//     })
// })

