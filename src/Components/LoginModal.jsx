import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserAuth } from '../Context/UserAuthContext';

function LoginModal(props) {
  const { error, setError } = props;
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
    <div className="login__container">
        <form action="" className="login__form" onSubmit={ handleSubmit } >
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
            <button className="login__form-button">Login</button>
        </form>
        <button className="login__google-button" onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  )
}

export default LoginModal