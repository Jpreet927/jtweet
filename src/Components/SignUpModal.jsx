import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserAuth } from "../Context/UserAuthContext"

function SignUpModal(props) {
  const { error, setError } = props;
  const { signUp } = useUserAuth();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      navigate("/")
      setError('');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="signup__container">
        <form action="" className="signup__form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter Your Name" />
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
            <input type="password" placeholder="Confirm Your Password" />
            <button className="signup__form-button">Sign Up</button>
        </form>
    </div>
  )
}

export default SignUpModal