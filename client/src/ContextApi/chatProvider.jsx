import { createContext, useContext, useState, useEffect } from "react";


const ChatContext = createContext();

const ChatProvider = ({children}) =>{
    const [user, setUser] = useState({});
    const [selectedChat, setSelectedChat] = useState();
    const [chat, setChat] = useState([]);
    const [loggedUser, setLoggedUser] = useState();


     
    useEffect(()=>{
        const userInfo = JSON.parse(localStorage.getItem("userInfo"))
        if(!userInfo){
            console.log("User not login");
        }
        setUser(userInfo)
    },[])

    return(
        <ChatContext.Provider value={{user, setUser,selectedChat, setSelectedChat,chat,setChat,loggedUser, setLoggedUser}}>
            {children}
        </ChatContext.Provider>
    )
}

export const ChatState = () =>{
    return useContext(ChatContext);
}
export default ChatProvider;