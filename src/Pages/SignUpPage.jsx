import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import SignUpModal from '../Components/SignUpModal'
import '../Styles/SignUpPage/SignUpPage.css'

function SignUpPage() {
    const [error, setError] = useState('');

  return (
    <div className='signup__container'>
      <div className="signup__modal-container">
        <SignUpModal error={error} setError={setError} />
      </div>
    </div>
  )
}

export default SignUpPage