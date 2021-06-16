import "./TappyActivation.scss";
import React from "react";
import { Button } from 'react-bootstrap';

interface Props {
  handleHistory: (url: string) => void;
}


export const TappyActivation: React.FC<Props> = (props) => {
  return (
    <div className="tappy-activation">
      <span className="tappy-activation__header">Welcome to Tappy 👋</span>
      <span className="tappy-activation__subheader">It's time to upgrade to the business card of the future.</span>

      <span className="tappy-activation__serial-number">Product serial number: AA000000</span>

      <div className="tappy-activation__buttons">
        <Button 
          className="tappy-activation__new-account"
          onClick={() => {
            props.handleHistory('/register');
          }}
          >
          Activate to a new account</Button>
        <Button
          className="tappy-activation__existing-account"
          onClick={() => {
            props.handleHistory('/login');
          }}
        >Activate to an existing account</Button>
      </div>
    </div>
  )
}