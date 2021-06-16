import "./RegisterButton.scss";
import React from "react";
import { Link } from "react-router-dom";

interface Props {
  text: string;
  onclick?: () => void; 
}

export const RegisterButton: React.FC<Props> = (props) => {
  return (
  <Link to="/register" className="register__btn">
    {props.text}
  </Link>);
}
