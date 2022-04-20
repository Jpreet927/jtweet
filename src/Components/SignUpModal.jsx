import React from 'react'

function SignUpModal() {
  return (
    <div className="signup__container">
        <form action="" className="signup__form">
            <input type="text" placeholder="Enter Your Name" />
            <input type="text" placeholder="Enter Your Email" />
            <input type="text" placeholder="Enter Your Password" />
            <input type="text" placeholder="Confirm Your Password" />
            <button className="signup__form-button">Sign Up</button>
        </form>
    </div>
  )
}

export default SignUpModal