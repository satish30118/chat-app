import React from 'react';
import{ChatState} from "../ContextApi/chatProvider"
import SingleChat from './SingleChat';

export default function ChatBox({fetchAgain, setFetchAgain}) {
  const {selectChat} = ChatState();
  return (
    <div style={{backgroundColor:"white", width:"70vw", height:"90vh",border:"3px solid black",margin:"10px", borderRadius:"10px", padding:"20px 15px"}}>
      <SingleChat fetchAgain = {fetchAgain} setFetchAgain={setFetchAgain}/>
      
    </div>
  )
}
