import React from "react";
import { FaMobileAlt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoMdClose } from "react-icons/io";
import "./Login.css";
import guitar from "../../assets/guitar.png"
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase/setup";

export default function Login({ onClose }) {
  const googleSignin=async()=>{
    try {
     await signInWithPopup(auth,googleProvider)
      
    } catch (error) {
      console.error(error)
      
    }
  }
  return (
    <div className="login-overlay">
      <div className="login-popup">
        {/* Close Button */}
        <button className="close-btn" onClick={onClose}>
          <IoMdClose />
        </button>

        {/* Image */}
        <div className="login-image">
          <img src={guitar} alt="Guitar Icon" />
        </div>

        {/* Message */}
        <h3 className="login-message">
          Help us become one of the safest places to buy and sell
        </h3>

        {/* Indicator Dots */}
        <div className="dots">
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>

        {/* Buttons */}
        <button className="phone-btn">
          <FaMobileAlt className="icon" /> Continue with phone
        </button>

        <button className="google-btn" onClick={googleSignin}>
          <FcGoogle className="icon" /> Continue with Google
        </button>

        {/* OR Section */}
        <p className="or-text">OR</p>
        <a href="#" className="email-login">
          Login with Email
        </a>

        {/* Privacy Notice */}
        <p className="privacy-text">
          All your personal details are safe with us. <br />
          If you continue, you are accepting{" "}
          <a href="#">OLX Terms and Conditions</a> and{" "}
          <a href="#">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
