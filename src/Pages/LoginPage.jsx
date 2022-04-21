import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import LoginModal from '../Components/LoginModal'

function LoginPage() {
  const [error, setError] = useState('');
  return (
    <div>
        <LoginModal error={error} setError={setError} />
        <Link to="/signup">Click to Sign Up</Link>
        {error ? <div><p>{error}</p></div> : ""}  
    </div>
  )
}

export default LoginPage