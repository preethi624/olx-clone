import React, { useContext, useState } from 'react';
import logo from "../../assets/olx5151.jpg";
import "./Signup.css";
import { firebaseContext } from '../../store/firebaseContext';
import firebase from 'firebase/compat/app';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc } from "firebase/firestore"; 

import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const { auth } = useContext(firebaseContext);
    const db = getFirestore();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const validateFields = () => {
        const newErrors = {};
        if (!username.trim()) newErrors.username = 'Username is required';
        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Enter a valid email';
        }
        if (!phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(phone)) {
            newErrors.phone = 'Enter a valid 10-digit phone number';
        }
        if (!password.trim()) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = async (e) => {
        e.preventDefault();
        if (!validateFields()) return;

        try {
            
            const result = await createUserWithEmailAndPassword(auth, email, password);

            
            await updateProfile(result.user, { displayName: username });

            
            await setDoc(doc(collection(db, "users"), result.user.uid), {
                uid: result.user.uid,
                username: username,
                email: email,
                phone: phone,
                createdAt: new Date(),
            });

            console.log("User profile updated successfully");
            navigate("/login");

        } catch (error) {
            console.error(error);
            if (error.code === 'auth/email-already-in-use') {
                setErrors((prev) => ({ ...prev, email: 'Email is already in use' }));
            } else {
                setErrors((prev) => ({ ...prev, general: 'An error occurred, please try again' }));
                console.error('Unhandled error:', error.message);
            }
        }
    };

    return (
        <div>
            <div className="signupParentDiv">
                <img width="200px" height="200px" src={logo} alt="logo" />
                <form onSubmit={handleChange}>
                    <label htmlFor="fname">Username</label>
                    <br />
                    <input
                        className="input"
                        type="text"
                        value={username}
                        id="fname"
                        name="name"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {errors.username && <span className="signup-error">{errors.username}</span>}
                    <br />
                    <label htmlFor="email">Email</label>
                    <br />
                    <input
                        className="input"
                        type="email"
                        value={email}
                        id="email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <span className="signup-error">{errors.email}</span>}
                    <br />
                    <label htmlFor="phone">Phone</label>
                    <br />
                    <input
                        className="input"
                        type="number"
                        id="phone"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    {errors.phone && <span className="signup-error">{errors.phone}</span>}
                    <br />
                    <label htmlFor="password">Password</label>
                    <br />
                    <input
                        className="input"
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <span className="signup-error">{errors.password}</span>}
                    <br />
                    {errors.general && <span className="signup-error">{errors.general}</span>}
                    <br />
                    <button>Signup</button>
                </form>
                <Link to="/login">Login</Link>
            </div>
        </div>
    );
}
