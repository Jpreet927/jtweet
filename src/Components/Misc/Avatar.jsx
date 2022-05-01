import React from "react";
import "../../Styles/Avatar/Avatar.css";

function Avatar(props) {
  const { dimension, image } = props;

  const avatarStyle = {
    width: dimension,
    height: dimension,
  };

  return (
    <div className="avatar__container" style={avatarStyle}>
      <img src={require("../../Assets/Images/Default-pfp.jpg")} alt="" />
    </div>
  );
}

export default Avatar;
