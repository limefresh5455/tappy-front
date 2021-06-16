import "./PasswordReset.scss";
import React, { useState } from "react";
import {
  Form,
  Button
} from "react-bootstrap";

interface Props {
  handleHistory: (url: string) => void;
}

export const PasswordReset: React.FC<Props> = (props) => {

  const [username, setUsername] = useState("");


  const handlePasswordReset = () => {
    const data = {
      username
    }
  
  }


  return (
    <div className="reset-password">
      <Form className="reset-password__form">
        <Form.Label className="reset-password__label">
          Password Reset 🔑
        </Form.Label>
        <span className="reset-password__description">Enter your Tappy username, or the email address that you used to register. We'll send you an email with your username and a link to reset your password.</span>
        <span className="reset-password__username">username or email</span>
        <Form.Control 
          type="password"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <Button
          onClick={(event) => {
            event.preventDefault();
            handlePasswordReset();
          }}
        >Reset Password</Button>
      </Form>


      <Button 
      onClick={() => {
        props.handleHistory('/login');
      }}
      className="reset-password__back">
        <svg width="18" height="9" viewBox="0 0 18 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.4561 4.31036L2.00006 4.31037M2.00006 4.31037L4.76006 7.62073M2.00006 4.31037L4.76006 1" stroke="#40538D" stroke-width="2"/>
        </svg>
        Go back to sign in
      </Button>

    </div>
  );
}