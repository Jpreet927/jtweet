import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import SignUpModal from '../Components/SignUpModal'

function SignUpPage() {
    const [error, setError] = useState('');

  return (
    <div>
      <SignUpModal error={error} setError={setError} />
      <Link to="/">Click to Login</Link>
      {error ? <div><p>{error}</p></div> : ""}   
    </div>
  )
}

export default SignUpPage