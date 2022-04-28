import React from 'react'
import '../../Styles/Avatar/Avatar.css'

function Avatar(props) {
    const { width } = props;

    const avatarStyle = {
        width: width,
        height: width,
    };

  return (
    <div className='avatar__container' style={avatarStyle}>
        <img src={require("../../Assets/Images/Default-pfp.jpg")} alt="" />
    </div>
  )
}

export default Avatar