import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUserAuth } from '../Context/UserAuthContext';
import '../Styles/LoginModal/LoginModal.css'

function LoginModal() {
  const [error, setError] = useState('');
  const { user, login, loginGoogle } = useUserAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      console.log(user);
      navigate("/home");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  }

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginGoogle();
      navigate("/home");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="login-modal__container">
        <form action="" className="login-modal__form" onSubmit={ handleSubmit } >
          <h3>Log in to Jtweet</h3>
            <input 
              type="email" 
              placeholder="Enter Your Email" 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
              type="password" 
              placeholder="Enter Your Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="login-modal__form-button">Login</button>
        </form>
        <div className="login-modal__google-container">
          <img src={require("../Assets/Icons/google-logo.png")} alt="" />
          <button className="login-modal__google-button" onClick={handleGoogleLogin}>Login with Google</button>
        </div>
        <div className="login-modal__redirect">
          <Link to="/signup" className='login-modal__link'>Click to <span>Sign Up</span></Link>
          {error ? <div><p className='login-modal__error'>{error}</p></div> : ""}  
        </div>
    </div>
  )
}

export default LoginModal