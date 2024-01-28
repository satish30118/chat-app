
import { NavLink } from 'react-router-dom';
import './home.css'

export default function Home() {
  return (
    <>
      <div className="home-page">
        <h1 id="dynamic">Hello!!</h1>
        <h1 className="home-page-heading">Welcome To Universe</h1> 
        <div className="home-btn">
            <button><NavLink to="/login">Get Start</NavLink></button>
        </div>
        
      </div>
    </>
  );
}
