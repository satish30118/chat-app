import React, { useState } from "react";
import { ChatState } from "../ContextApi/chatProvider";
import getSender from "./ChatLogics";
import UpdateGroupChatModel from "./UpdateGroupChatModel";
import axios from "axios";
import { useEffect } from "react";
// import io from "socket.io-client"

import "./singlechat.css";
import ScrollableChat from "./ScrollableChat";

// const ENDPOINT = "http://localhost:8000";
// var socket, selectedChatCompare;

export default function SingleChat({ fetchAgain, setFetchAgain }) {
  const { user, selectedChat, setSelectedChat } = ChatState();
  const [viewPop, setViewPop] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setloading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const fetchMessage = async () => {
    if (!selectedChat) return;

    try {
      setloading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      console.log(messages);
      setloading(false);
      // socket.emit('join chat', selectedChat._id);
    } catch (error) {
      console.log(error);
    }
  };

//   useEffect(()=>{
//     // socket = io(ENDPOINT);
//     // socket.emit("setup", user);
//     // socket.on('connected',()=>{
//     //   setSocketConnected(true)
//     // });
//     socket.on("typing", ()=> setIsTyping(true));
//     socket.on("stop typing", ()=> setIsTyping(false));
// },[])

  useEffect(() => {
    fetchMessage();
    // selectedChatCompare = selectedChat;
  }, [selectedChat]);


//   useEffect(()=>{
//     // socket.on("message received", (newMessageReceived) => {
//       if(!selectedChatCompare || selectedChatCompare._id !==newMessageReceived.chat._id){
//         //notification
//       }else{
//         setMessages([...messages, newMessageReceived])
//       }
// })


  const sendMessage = async (e) => {
    // console.log(e.key)
    if (e.key === "Enter" && newMessage) {
      setNewMessage("");
      // socket.emit("stop typing", selectedChat._id)
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.post(
          "/api/message",
          {
            chatId: selectedChat._id,
            content: newMessage,
          },
          config
        );

        // socket.emit("new message", data)
        setMessages([...messages, data]);
        console.log(data);
       
      } catch (error) {
        console.log(error);
      }
    }
  };



  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    // if(!socketConnected) return;

    if(!typing){
      setTyping(true);
      // socket.emit('typing', selectedChat._id)
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(()=>{
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;

      if(timeDiff >= timerLength && typing){
        // socket.emit("stop typing", selectedChat._id);
        setTyping(false)
      }
    }, timerLength)
  };

  return (
    <>
      {selectedChat ? (
        <>
          <div
            style={{
              fontSize: "26px",
              fontWeight: "400",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {!selectedChat.isGroupChat ? (
              <>{getSender(user, selectedChat.users)}</>
            ) : (
              <>
                <div>{selectedChat.chatName.toUpperCase()}</div>
                <div>
                  <button
                    style={{ border: "none", background: "transparent" }}
                    onClick={() => {
                      setViewPop(true);
                    }}
                  >
                    👁️
                  </button>
                </div>
                <UpdateGroupChatModel
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  setViewPop={setViewPop}
                  viewPop={viewPop}
                  fetchMessage={fetchMessage}
                />
              </>
            )}
          </div>
          <div
            style={{
              backgroundColor: "lightgray",
              height: "80vh",
              width: "100%",
              borderRadius: "10px",
            }}
          >
            {loading ? (
              "Loading..."
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}

            <div onKeyDown={sendMessage}>
            {isTyping ? <div style={{fontWeight:"600", color:"blue", position:"relative",top:"-30px"}}>Typing...</div>:<></>}
              <input
                type="text"
                placeholder="Write here..."
                onChange={typingHandler}
                style={{
                  width: "64vw",
                  padding: "7px 20px",
                  position: "absolute",
                  bottom: "-70px",
                  fontSize: "20px",
                  borderRadius: "7px",
                  margin: "0px 8px",
                  zIndex:"0"
                }}
                value={newMessage}
              />
            </div>
          </div>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2 style={{ textAlign: "center", marginTop: "30vh" }}>
            {" "}
            Let's chat with friend, Select your friend
          </h2>
        </div>
      )}
    </>
  );
}
