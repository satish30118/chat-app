import React, { useState } from 'react'
import { json, useNavigate } from 'react-router-dom'
import { ChatState } from '../ContextApi/chatProvider';
import "./userheader.css"
import ChatLoading from './ChatLoading';
import UserListItem from './UserListItem';
import axios from 'axios';

export default function UserHeader() {
  const navigate = useNavigate();
  const {user,setSelectedChat,chat,setChat} = ChatState();
  const [showProfile, setShowProfile] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [showpopSearch, setShowpopSearch] = useState(true);


  const handleLogout = (e) => {
        localStorage.removeItem("userInfo");
        navigate("/login");
        alert("Successfully!! Logout")
  }
  const handleSearch = async(e) => {
    e.preventDefault();
    setShowpopSearch(true);

    const token = user.token;
    if(!search){
     return  alert("write something")
    }
   
    try {
      
      const {data} = await axios.get(`/api/user?search=${search}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
        
      });
      const response = await JSON.stringify(data);
      console.log(response)

      setSearchResult(data);
      
    } catch (error) {
      
      console.log("Error:- " + error)
    }
}

const accessChat = async(userId) =>{
  console.log("ACESS CHAT CALLED")
  try {
    setLoadingChat(true);
    const {data} = await axios.post(`/api/chat`,{userId},{
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${user.token}`
      }
      
    });
    console.log((data))
    if(!chat.find((c)=> c._id === data._id)){ setChat([data, ...chat])};
    setSelectedChat(data);
    setLoadingChat(false);
    // setShowSearch(false);

  } catch (error) {
    console.log("ACCESS CHAT ERROR:- " + error)
  }
  
}

const searchCross = ()=>{setShowpopSearch(false)};

  return (
    <>
        <div className="user-header">
            <div className="user-header-left">
              <div style={{display:"flex"}}>
                <i class="fa-search fa-solid"></i>
                <input type="search" name="search" id="search-bar" placeholder='Search User'
                onChange={(e)=>{setSearch(e.target.value)}} value={search}/>
                <button style={{border:"none", padding:"4px 10px",borderRadius:"5px",fontSize:"16px",fontWeight:"600"}} onClick={handleSearch}>Go</button>
                </div>
                <div className='user-list' style={{display:`${(showpopSearch)?"inline-blcok":"none"}`}}>
                  <div style={{display:"flex", alignItems:"center",justifyContent:"right"}}>
                  <button onClick={searchCross} style={{border:"2px solid gray", borderRadius:"10px", padding:"0px 10px",fontWeight:"600"}}>X</button>
                  </div>
                  {loading?"....":
                  (
                    searchResult?.map((user) => (
                      <UserListItem key={user._id}
                      user={user}
                      handdleFunction = {()=>{accessChat(user._id)}}  /> 
        
         ))
                  )}
                </div>
            </div>
            <div className="user-header-mid"><h2>Let's Chat</h2></div>
            <div className="user-header-right">
              <div className="user-notification">
              <i class="fa-bell fa-solid"></i>
             
              </div>
              <div className="user-profile">
              <i class="fa-user fa-solid"></i>
              <div className="menu-list" style={{display:""}}>
                <ul>
                  <li><button onClick={() => setShowProfile(true)}>Profile</button></li>
                  <li><button onClick={handleLogout}>Logout</button></li>
                </ul>
              </div>
              </div>

            </div>
         
        </div>
        <div style={{display:`${showProfile ? "block" :"none"}`}} className='showProfile'>
       <p  onClick={() => setShowProfile(false)} >X</p>
                Coming Soon
      </div>

      

      
    </>
  )
}
