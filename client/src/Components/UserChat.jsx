import React from 'react'
import { ChatState } from '../ContextApi/chatProvider'
import getSender from './ChatLogics';

export default function UserChat({userChatHanddler,chat}) {

    const {selectedChat,setSelectedChat, user,setChat,loggedUser, setLoggedUser} = ChatState();
  return (
    <>
        <div onClick={userChatHanddler} style={{cursor:"pointer",margin:"2px",fontSize:"17px", fontWeight:"600", backgroundColor:`${selectedChat === chat ? "green" : "gray"}`, padding:"5px 12px"}}>
                <div>{!chat.isGroupChat?(getSender(loggedUser,chat.users)):(chat.chatName)}</div>

        </div>
      
    </>
  )
}
