import React from 'react';
import { ChatState } from '../ContextApi/chatProvider';
import { giveSenderMargin, isLastMessage, isSameSender } from './ChatLogics';
import ScrollableFeed from "react-scrollable-feed"


export default function ScrollableChat({messages}) {
    const {user} = ChatState();
    console.log(messages)
  return (

      <ScrollableFeed>
          {messages && messages.map((m,i)=>(
              <div style={{display:"flex"}} key={m._id}>
              {  console.log(m)}
               {(isSameSender(messages, m, i,user._id) || isLastMessage(messages, i, user._id)) && (
                     <i class="fa-user fa-solid"></i>
               )}
               <span style={{backgroundColor:`${m.sender._id===user.id ? "#BEE3F8" : "#B9F5D0"}`, padding:"5px 7px", margin:"2px", borderRadius:"9px", maxWidth:"70%", marginLeft:giveSenderMargin(messages, m, i,user._id)}}>{m.content}</span>
              </div>
          ))}
      </ScrollableFeed>
         
   
  )
}
