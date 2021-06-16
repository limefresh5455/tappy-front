import "./ProfileSocial.scss";
import React from "react";


interface Props {
  username: string;
  imgSrc: string;
  socialLink: string;
}

export const ProfileSocial: React.FC<Props> = (props) => {
  return (
  <a href={props.socialLink} className="profile-social">
    <div className="profile-social-img__wrapper">
    
      <img 
      src={props.imgSrc} 
      className="profile-social-img" /> 
    </div>
    <div className="profile-social-username__wrapper">
      <span className="profile-social-username">
        @{props.username}
      </span>
    </div>
  </a>
  );
}

