import "./TappyLogo.scss";
import React from "react";

interface Props {

}


export const TappyLogo: React.FC<Props> = () => {
  return (
  <div className="tappy-logo">
   <img src="/images/tappyDefaultLogo.png" /> 
  </div>
  )
}