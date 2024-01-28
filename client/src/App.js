
import React from 'react-dom';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Navbar from "./Pages/Navbar";
import Register from "./Components/Register";
import Home from './Pages/Home';
import Login from './Components/Login';
import Erorr from './Pages/Erorr';
import chatPage from './Pages/chatPage';



function App() {
  return (
    <>
    
    <Navbar/>
    <Routes>
      <Route exact path="/" Component={Home}></Route>
      <Route exact path="/login" Component={Login}></Route>
      <Route exact path="/register" Component={Register}></Route>
      <Route exact path="/chats" Component={chatPage}></Route>
      <Route path="*" Component={Erorr}></Route>
    </Routes>

   

    </>
    
  );
}

export default App;
