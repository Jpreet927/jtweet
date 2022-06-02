import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useThemeContext } from "../Context/ThemeContext"
import LoginModal from '../Components/LoginModal'
import '../Styles/LoginPage/LoginPage.css'

function LoginPage() {
  const [error, setError] = useState('');
  const { theme } = useThemeContext();

  return (
    <div className={`${theme} login__container`}>
      <div className="login__modal-container">
        <LoginModal error={error} setError={setError} />
      </div>
    </div>
  )
}

export default LoginPage