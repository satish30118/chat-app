import React, { useState } from 'react'
import { ChatState } from '../ContextApi/chatProvider'
import UserBadgeItem from './UserBadgeItem';
import axios from "axios"
import UserListItem from './UserListItem';

export default function UpdateGroupChatModel({fetchAgain,setFetchAgain,setViewPop, viewPop,fetchMessage}) {
    const {selectedChat, setSelectedChat,user} = ChatState();

    const [groupName,setGroupName] = useState();
    const [search,setSearch] = useState("");
    const [searchResult,setSearchResult] = useState([]);
    const [loading,setLoading] = useState(false);
    const [renameLoading,setrenameLoading] = useState(false);


    const handdleDelete =async(remvUser)=>{
        if(selectedChat.groupAdmin._id!==user._id && remvUser._id!==user._id){
            alert("ONLY ADMIN CANT REMOVE SOMEONES")
            return;
        }
        try {
            setLoading(true)
            const  config={
                headers:{
                  "Content-Type":"application/json",
                  Authorization:`Bearer ${user.token}`
                }
                
              }
              const {data} = await axios.put("/api/chat/groupremove",{
                chatId:selectedChat._id,
                userId:remvUser._id,
                
              },config
              );
              remvUser._id === user._id ? setSelectedChat():setSelectedChat(data)
              setFetchAgain(!fetchAgain);
              fetchMessage();
              setLoading(false);
            
        } catch (error) {
            
        }
    }
    const addUserToGroup = async(adduser)=>{
        if(selectedChat.users.find((u)=> u._id === adduser._id)){
            alert("User Already in Group")
            return;
        }
        if(selectedChat.groupAdmin._id!==user._id){
            alert("You can't do add people because your are not grp Admin!!")
            return;
        }
        try {
            setLoading(true)
            const  config={
                headers:{
                  "Content-Type":"application/json",
                  Authorization:`Bearer ${user.token}`
                }
                
              }
              const {data} = await axios.put("/api/chat/groupadd",{
                chatId:selectedChat._id,
                userId:adduser._id,
                
              },config
              );
              setSelectedChat(data);
              setFetchAgain(!fetchAgain);
              setLoading(false)
              alert("User Added Successfully!!")

            
        } catch (error) {
            console.log(error)
        }

    }

    const handdleRename = async()=>{
        if(!groupName) return;

        try {
            setrenameLoading(true)
            const  config={
                headers:{
                  "Content-Type":"application/json",
                  Authorization:`Bearer ${user.token}`
                }
                
              }
              const {data} = await axios.put("/api/chat/rename-group",{
                chatId:selectedChat._id,
                chatName:groupName,
              },config
              );

              setSelectedChat(data);
              setFetchAgain(!fetchAgain);
              setrenameLoading(false)
        } catch (error) {
            console.log(error)
            
        }
    }

    const handdleSearch = async(e)=>{
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
    // console.log(response)
    setLoading(false)
    setSearchResult(data);
    }catch(err){
        console.log(err)
    }
}
  return (
    <>
    <div className="create-group" style={{display:`${viewPop ? "block":"none"}`,backgroundColor:"white", width:"450px", height:"auto", paddingBottom:"20px",zIndex:"30000", boxShadow:"1px 2px 16px 4px"}}>
            <button onClick={()=>{setViewPop(false)}}>X</button>
        <h2 style={{textAlign:"center",marginBottom:"20px"}}>{selectedChat.chatName}</h2>
           <div>
           {selectedChat.users.map((u)=>(
                <UserBadgeItem key={user._id} user={u} handdleFunction={()=>handdleDelete(u)}
               />))}
           </div>
           <form action="">
           <div >
                <input type="text" placeholder='Group Name' style={{width:"70%",padding:"5px 10px",fontSize:"21px"}} onChange={(e)=>{setGroupName(e.target.value)}}/>
                <button style={{width:"30%",padding:"5px 10px",fontSize:"21px"}} onClick={handdleRename}>Update</button>
              </div>
              
              <div style={{marginTop:"8px"}}>
                <input type="text" placeholder='Add User' style={{width:"100%",padding:"5px 10px",fontSize:"21px"}} onChange={handdleSearch} />
              </div>

              <div style={{marginTop:"8px", zIndex:"20000"}}>
                {loading? "Loading...":(
                searchResult
                  ?.slice(0,4)
                  .map((user)=>(
                  <UserListItem key={user._id} user={user} handdleFunction={()=>addUserToGroup(user)}/>
                ))
                )}
              </div>

              <div>
              <button style={{width:"50%",padding:"5px 10px",fontSize:"21px", backgroundColor:"red", fontWeight:"630", color:"white", border:"none",borderRadius:"10px", margin:"20px 30%"}} onClick={()=> handdleDelete(user)}>Leave Group</button>
              </div>

           </form>
            </div>
      
    </>
  )
}
