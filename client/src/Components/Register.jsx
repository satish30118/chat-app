import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./register.css";
import regside from './Image/register-side.jpg'

export default function Register() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    work: "",
    password: "",
    cpassword: "",
  });

  let name, value;
  const handleData = (e) => {
    // console.log(e);
    name = e.target.name;
    value = e.target.value;

    setData({ ...data, [name]: value });
  };

  const sendData = async (e) => {
    // console.log(e);
    e.preventDefault();
    const { name, email, work, password, cpassword } = data;
    
    if(!name || !email || !work || !password ||!cpassword ){
      return alert("Empty field check properly");
 }
    if(password!=cpassword){
      return alert("Password and confirm password not match")
  }

 
    const res = await fetch("/api/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, work, password}),
    });
  
    if(res.status == 200){
      navigate("/login")
      return window.alert("Registration Success");

    }else if(res.status == 422){
      return window.alert("Email Already Exist");
    }else{
      window.alert("Registration unsuccessful!, sever problem try again");
    }
  };

  return (
    <>
      <div className="register-page">
        <div className="register-form">
          <div className="register-user-logo">
            <img src={regside} alt="Register Image" />
            <NavLink to={"/login"}>Have a account - Login</NavLink>
          </div>
          <div className="reg-form-wrapper">
          <form method="POST">
            <h1 className="reg-form-heading">Register Form</h1>
            <div className="reg-form-row">
              <div className="reg-form-icon">
            <i class="fa-solid fa-user"></i>
            </div>
              <input
                type="text"
                id="name"
                placeholder="Name*"
                autoComplete="off"
                value={data.name}
                onChange={handleData}
                name="name"
                required
              />
            </div>

            <div className="reg-form-row">
            <div className="reg-form-icon">
            <i class="fa-solid fa-envelope"></i>
            </div>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="abcd1234@gmail.com*"
                autoComplete="off"
                value={data.email}
                onChange={handleData}
                required
              />
            </div>
            <div className="reg-form-row">
            <div className="reg-form-icon">
            <i class="fa-solid fa-briefcase"></i>
            </div>
              <input
                type="text"
                name="work"
                id="work"
                placeholder="Proffesion"
                autoComplete="off"
                value={data.work}
                onChange={handleData}
              />
            </div>


            <div className="reg-form-row">
            <div className="reg-form-icon">
            <i class="fa-solid fa-lock"></i>
            </div>
              <input
                type={showPass ? "text" : "password"}
                name="password"
                id="password"
                placeholder="********"
                autoComplete="off"
                value={data.password}
                onChange={handleData}
                required
              />
            </div>

            <div className="reg-form-row">
            <div className="reg-form-icon">
            <i class="fa-solid fa-lock"></i>
            </div>
              <input
                type={showPass ? "text" : "password"}
                name="cpassword"
                id="cpassword"
                placeholder="********"
                autoComplete="off"
                value={data.cpassword}
                onChange={handleData}
                required
              />
            </div>

            <div onClick={()=> setShowPass(!showPass)} style={{color:"blue", fontSize:"23px"}}>{showPass ? "Hide Password" : "Show Password"}</div>
          
            <div className="reg-form-btn">
              <input
                type="button"
                className="btn register_btn"
                value="Register"
                onClick={sendData}
              />
            </div>
          </form>
          </div>
        </div>
      </div>
    </>
  );
}
