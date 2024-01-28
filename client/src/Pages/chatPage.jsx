import React, {useState} from 'react';
import SideDrawer from '../Components/SideDrawer';
import UserHeader from '../Components/UserHeader';
import { ChatState } from '../ContextApi/chatProvider';
import "./chatpage.css";
import ChatBox from '../Components/ChatBox';
import MyChats from '../Components/MyChats';

export default function ChatPage() {
  const {user} = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  

  return (
    <>
      <div className='chat-page'>
        {user && <UserHeader/>}
        <div className="chat-ui">
        {user && <MyChats fetchAgain = {fetchAgain} />}
          {user && <ChatBox fetchAgain = {fetchAgain} setFetchAgain={setFetchAgain}/>}
          
          
        </div>

      </div>
    
    </>
  )
}
