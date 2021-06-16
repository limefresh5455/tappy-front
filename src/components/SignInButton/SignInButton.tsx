import React from "react";
import { Link } from "react-router-dom";
import "./SignInButton.scss";

interface Props {
  text: string;
  onclick?: () => void; 
  handleHistory: (url: string) => void;
}

export const SignInButton: React.FC<Props> = (props) => {
  return (
    <>
    {props.onclick ? (
      <a 
      className="sign-in__btn"
      onClick={() => {
        if (props.onclick) {
          props.onclick(); 
        }
       }}>
        {props.text} 
        <svg width="17" height="9" viewBox="0 0 17 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.192017 4.68964H15.648M15.648 4.68964L12.888 1.37927M15.648 4.68964L12.888 8" stroke="white" stroke-width="2"/>
        </svg>
      </a>
    ):
    (
    <Link to="/login" className="sign-in__btn">{props.text} 
      <svg width="17" height="9" viewBox="0 0 17 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.192017 4.68964H15.648M15.648 4.68964L12.888 1.37927M15.648 4.68964L12.888 8" stroke="white" stroke-width="2"/>
      </svg>
    </Link>
    )}
  
  </>)
}