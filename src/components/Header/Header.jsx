import React, { useContext, useEffect, useState } from "react";
import { FaSearch, FaHeart } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";
import "./Header.css";
import Login from "../Login/Login";
import logo from "../../assets/logo.webp"
import { Link } from "react-router-dom";
import { useNavigate,useLocation } from "react-router-dom";

import { firebaseContext } from "../../store/firebaseContext.jsx";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { FaUser, FaChevronDown } from "react-icons/fa";
import { PostContext } from "../../store/PostContext.jsx";

export default function Header() {
  const [showLogin,setShowLogin]=useState(false)
  const [user,setUser]=useState(null)
  const {auth}=useContext(firebaseContext)
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate=useNavigate()
  const location=useLocation()
  const {searchQuery,setSearchQuery}=useContext(PostContext)
  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth,(user)=>{
      if(user){
        setUser(user)
      }else{
        setUser(null)
      }
    });

    return ()=>unsubscribe();


  },[auth]);
  const handleLogout=()=>{
    signOut(auth).then(()=>{
      console.log("User signed out");
      setUser(null)
      navigate("/signup")
      
    }).catch((error)=>{
      console.log(error.message);
      
    })
  }
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (location.pathname !== "/") {
      navigate(`/?search=${encodeURIComponent(query)}`);
    }
  };
  return (
    <>
    <header className="header">
      <div className="logo"><img src={logo} alt="" /></div>
      <div className="location">
      <IoMdSearch className="search"/>
        <input type="text" placeholder="India" />
       
        <IoIosArrowDown className="dropdown-icon" />
      </div>
      <div className="search-bar">
        <input type="text" placeholder='Search "Cars"' value={searchQuery} onChange={handleSearchChange}/>
        <button className="btn"> 
          <FaSearch />
        </button>
      </div>
      <div className="header-right">
        <span className="language">ENGLISH <IoIosArrowDown /></span>
        <FaHeart className="icon" />
        <div>
          {user?(
            <div className="user-dropdown">
            <div className="user-info" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <FaUser className="icon" />
              <FaChevronDown className="icon" />
            </div>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        
          ):(<Link to="/login" className="login">Login</Link>)}
        </div>
       
        <Link to="/create"  className="sell-btn">+ SELL</Link>
      </div>
    </header>
    {showLogin && <Login onClose={()=>setShowLogin(false)}/>}
    </>
  );
}
