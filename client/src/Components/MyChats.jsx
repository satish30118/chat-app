import React, {useState,useEffect} from 'react'
import { ChatState } from '../ContextApi/chatProvider'
import axios from "axios";
import './mychat.css';
import UserChat from './UserChat';
import GroupChat from './GroupChat';
import UserListItem from './UserListItem';
import UserBadgeItem from './UserBadgeItem';

export default function MyChats({fetchAgain}) {
  const [showPop, setShowPop] = useState(false);
  const [groupName, setGroupName] = useState();
  const [selectUsers, setSelectUsers] = useState([]);
  const [search, setSearch] = useState();
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const {selectedChat,setSelectedChat, user,chat,setChat,loggedUser, setLoggedUser} = ChatState();

  const fetchChat = async(e) => {
    
    try {
      const {data} = await axios.get(`/api/chat`,{
        headers:{
          Authorization:`Bearer ${user.token}`
        }
        
      });
      // const response = await JSON.stringify(data);
      // console.log(response)
setChat(data)
      
    } catch (error) {
      
      console.log("Error:- " + error)
    }
}

const handleSearch =async(e)=>{
  setSearch(e.target.value)
  const token = user.token;
  if(!e.target.value){
    return;
  }
  try {
    setLoading(true)
    const {data} = await axios.get(`/api/user?search=${search}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
      
    });
    const response = await JSON.stringify(data);
    console.log(response)
    setLoading(false)
    setSearchResult(data);
    

}catch(err){
  console.log(err)
}
}

const addUserToGroup=(userToBeAdd)=>{
  if(selectUsers.includes(userToBeAdd)){
    alert("USER ALREADY ADDED")
    return
  }

  setSelectUsers([...selectUsers,userToBeAdd])

}

const handdleDelete=(userToBeDel)=>{
    setSelectUsers(selectUsers.filter((select) => select._id !== userToBeDel._id));
}

const handleSubmit = async (e) =>{
  if(!groupName || !selectUsers){
    alert("Fill all Field!!")
    return;
  }
  try {
   const  config={
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${user.token}`
      }
      
    }
    const {data} = await axios.post("/api/chat/group",{
      name:groupName,
      users: JSON.stringify(selectUsers.map((u)=> u._id))
    },config
    );

    console.log("Message data " + data)

    setChat([data, ...chat]);
    alert("group created sucessfully!!")
    // setShowPop(false)
    
  } catch (error) {
    console.log("HELLO ERROR" + error)
  }

}
useEffect(()=>{
  setLoggedUser((localStorage.getItem("userInfo")));
  fetchChat();
},[fetchAgain])
  return (
    <>
      <div className="my-chat">
        <div className="my-chat-header">
          <h2>My Chat</h2>
          <button onClick={()=>{setShowPop(true)}}>Create New Group +</button>
          <div className="create-group" style={{display:`${showPop ? "block":"none"}`,backgroundColor:"white", width:"450px", height:"auto", zIndex:"30000", boxShadow:"1px 2px 16px 4px"}}>
            <button onClick={()=>{setShowPop(false)}}>X</button>
            <h2 style={{textAlign:"center",marginBottom:"20px"}}>CREATE GROUP </h2>
            <form >
              <div>
                <input type="text" placeholder='Group Name' style={{width:"100%",padding:"5px 10px",fontSize:"21px"}} onChange={(e)=>{setGroupName(e.target.value)}}/>
              </div>
              <br/>
             
              <div style={{marginBottom:"8px"}}>
                <input type="text" placeholder='Add User by Search...' style={{width:"100%",padding:"5px 10px",fontSize:"21px"}} onChange={handleSearch} />
              </div>
             
              {selectUsers.map((u)=>(
                <UserBadgeItem key={user._id} user={u} handdleFunction={()=>handdleDelete(u)}
               />))}
          
              <div style={{marginTop:"8px"}}>
                {loading? "Loading...":(
                searchResult
                  ?.slice(0,4)
                  .map((user)=>(
                  <UserListItem key={user._id} user={user} handdleFunction={()=>addUserToGroup(user)}/>
                ))
                )}
              </div>
              <br/>
              <button type="submit" style={{width:"50%", backgroundColor:"Red", fontSize:"21px",fontWeight:"600",padding:"8px 10px",border:"none",color:"white",borderRadius:"8px", margin:"20px 30%" }} onClick={handleSubmit}>Create Group</button>
            </form>

        </div>
        
        </div>
        <div className="user-chat">
          {chat?(
            chat.map((chat)=>(
              <UserChat key={chat._id} userChatHanddler={()=>setSelectedChat(chat)} chat={chat}/>
            ))
          ):"HELLO"}
        </div>
      </div>
    </>
  )
            }
