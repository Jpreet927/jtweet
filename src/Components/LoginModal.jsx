import React from 'react'

function LoginModal() {
  return (
    <div className="login__container">
        <form action="" className="login__form">
            <input type="text" placeholder="Enter Your Email" />
            <input type="text" placeholder="Enter Your Password" />
            <button className="login__form-button">Login</button>
        </form>
    </div>
  )
}

export default LoginModal