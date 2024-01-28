const Chat = require("../Model/chatModel");
const User = require("../Model/userModel");

const accessChat = async (req,res) => {
   const {userId} = req.body;

   if(!userId){
    console.log("NO UserID");
    return res.status(400)
   }

   var isChat = await Chat.find({
     isGroupChat:false,
     $and:[
        {users:{$elemMatch:{$eq:req.user._id}}},
        {users:{$elemMatch:{$eq:userId}}}
     ]
   }).populate("users", "-password")
        .populate("latestMessage")
        isChat = await User.populate(isChat,{
            path:"latestMessage.sender",
            select: "name pic email"
        });

        if(isChat.length>0){
            res.send(isChat[0]);
        }else{
            var chatData = {
                chatName : "sender",
                isGroupChat:false,
                users:[req.user._id,userId]
            }
            try{
                const createChat = await Chat.create(chatData);
                const FullChat = await Chat.findOne({_id:createChat._id}).populate(
                    "users",
                    "-password"
                )
                res.send(FullChat);
            }catch(err){
                console.log(err)
            }
        }
}

const fetchChat = async(req,res) => {
    try {
        Chat.find({users:{$elemMatch:{$eq:req.user._id}}})
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .sort({updateAt: -1})
        .then(async (result)=>{
            result =await User.populate(result, {
                path:"latestMessage.sender",
                select:"name pic email"
            })
            res.send(result).status(200)
        })
        
    } catch (error) {
        console.log(error)
    }
}

const createGroupChat = async (req,res) => {

    if(!req.body.users || !req.body.name){
        return res.status(400).send({message:"Fill all data"});
    }

    var users = JSON.parse(req.body.users);
    if(users.length<2){
        return res.status(400).send("More than 2 users for group chat")
    }
    users.push(req.user);

    try{
        const groupChat = await Chat.create({
            chatName:req.body.name,
            users:users,
            isGroupChat:true,
            groupAdmin: req.user
        });

        const fullGroupChat = await Chat.findOne({_id:groupChat._id})
        .populate("users", "-password")
        .populate("groupAdmin", "-password")

        res.status(200).json(fullGroupChat);
    }catch(err){
        console.log(err);
    }
}

const renameGroup = async (req,res) => {
    const {chatId, chatName} = req.body;

    const updateChat = await Chat.findByIdAndUpdate(chatId,{
        chatName:chatName
    },{
        new:true
    })
    .populate("users", "-password")
        .populate("groupAdmin", "-password")
    
        if(!updateChat){
            return res.status(404).send("Chat not Found");
        }else{
            return res.status(200).send(updateChat);
        }

}
const addToGroup = async (req,res) => {
    const {chatId, userId} = req.body;

    const addUser = await Chat.findByIdAndUpdate(chatId,{
        $push:{users:userId}
    },{
        new:true
    })
    .populate("users", "-password")
        .populate("groupAdmin", "-password")
    
        if(!addUser){
            return res.status(404).send("Chat not Found");
        }else{
            return res.status(200).send(addUser);
        }

}

const removeFromGroup = async (req,res) => {
    const {chatId, userId} = req.body;

    const removeUser = await Chat.findByIdAndUpdate(chatId,{
        $pull:{users:userId}
    },{
        new:true
    })
    .populate("users", "-password")
        .populate("groupAdmin", "-password")
    
        if(!removeUser){
            return res.status(404).send("Chat not Found");
        }else{
            return res.status(200).send(removeUser);
        }

}



module.exports = { accessChat,fetchChat,createGroupChat,renameGroup,addToGroup,removeFromGroup};


