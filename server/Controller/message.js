const Chat = require("../Model/chatModel");
const User = require("../Model/userModel");
const Message = require("../Model/messageModel");



const sendMessage = async(req,res) =>{
    const {chatId, content} =req.body;
    if(!chatId || !content){
        console.log("Data not filled")
        return res.status(400);
    }

    var newMessage =  {
        sender:req.user._id,
        content:content,
        chat:chatId
    }

    
    try {
        var message = await Message.create(newMessage);
        message = await message.populate("sender","name pic");
        message = await message.populate("chat");
        message = await User.populate(message,{
            path:"chat.users",
            select:"name pic email"
        });
        await Chat.findByIdAndUpdate(req.body.chatId,{
            latestMessage:message,
        });
        res.json(message)
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
}

const getAllMessages = async(req,res) => {
    try {
        const message = await Message.find({chat:req.params.chatId}).populate("sender","name pic email").populate("chat")
        res.json(message);
    } catch (error) {

        console.log(error);
        
    }
}
module.exports = {sendMessage, getAllMessages}