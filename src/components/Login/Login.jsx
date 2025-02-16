import React, { useState,useContext } from 'react';

import Logo from '../../assets/olx5151.jpg';
import './Login.css';
import { firebaseContext } from '../../store/firebaseContext.jsx';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';


function Login() {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [errors,setErrors]=useState({})
    const {auth}=useContext(firebaseContext)
    const navigate=useNavigate();
    const validateForm = () => {
      const errors = {};
  
      if (!email) {
        errors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = 'Please enter a valid email address';
      }
  
      if (!password) {
        errors.password = 'Password is required';
      } else if (password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
      }
  
      setErrors(errors);
      return Object.keys(errors).length === 0;
    };
    const handleLogin=(e)=>{
        e.preventDefault()
        if(validateForm()){

        
        signInWithEmailAndPassword(auth,email,password)
        .then((userCredential)=>{
            console.log(userCredential.user);
            navigate("/")
            
        })
        .catch((error)=>{
            console.log(error.message);
            alert("Invalid email or password")
            
        })
      }

    }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}/>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
           value={email}
           onChange={(e)=>setEmail(e.target.value)}

          />
             {errors.email && <span className="login-error-message">{errors.email}</span>}
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
           value={password}
           onChange={(e)=>setPassword(e.target.value)}
          />
          {errors.password && (
              <span className="login-error-message">{errors.password}</span>
            )}
          <br />
          <br />
          <button>Login</button>
        </form>
        {errors.firebase && (
          <div className="login-firebase-error">{errors.firebase}</div>
        )}
        <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
}

export default Login;