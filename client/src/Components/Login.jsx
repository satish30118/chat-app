import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [showresult, setShowResult] = useState();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/chats");
    }
  }, []);

  //sending data
  const sendData = async (e) => {

    if(!email || !password){
      return alert("fill empty data")
   }
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const {data, status} = await axios.post( "/api/user/login", { email, password },config);

      const datajson = JSON.stringify(data)
      const userInfo = localStorage.setItem("userInfo", datajson)

      if (status == 200) {
        window.alert("Login successful!!");
        navigate("/chats");
        
      } else if (status == 400) {
        setShowResult("Invalide Creatinals");
      } else {
        setShowResult("You have not registered!");
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
      <div className="login-page">
        <div className="login-form">
          <h1 className="login-form-heading">Account Login</h1>
          <div className="login-user-logo">
            <i class="fa-solid fa-user"></i>
          </div>
          <form method="POST" autoComplete="off">
            <div className="form-row">
              <i class="fa-solid fa-user"></i>
              <input
                type="email"
                name="email"
                placeholder="Email Id"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="form-row">
              <i class="fa-solid fa-lock"></i>
              <input
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="********"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
              />
              <input
                type="button"
                onClick={() => setShowPass(!showPass)}
                value={showPass ? "Hide" : "Show"}
                id="passvisible"
              />
            </div>
            <div className="login-btn">
              <input type="button" value="Login" onClick={sendData} />
            </div>
            <div className="no-account">
              <NavLink to={"/register"}>Don't have Account - Register</NavLink>
            </div>
            <div style={{ color: "red", fontSize: "28px", marginTop:"20px", background:"red", color:"white"}}>{showresult}</div>
          </form>
        </div>
      </div>
    </>
  );
}
