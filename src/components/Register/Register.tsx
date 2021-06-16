import "./Register.scss";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import { Error } from "../Error/Error";

interface Props {
  checkUserSession: () => void;
  handleHistory: (url: string) => void;
  handleLogout: () => void;
}

const proxy = process.env.REACT_APP_PROXY_DEVELOPMENT;

export const Register: React.FC<Props> = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [tappySerialNumber, setTappySerialNumber] = useState("");

  const [error, setError] = useState({
    active: false,
    message: ""
  })

  const handleRegister = async () => {
    
    try {
      const data = {
        email,
        password,
        password_confirmation: passwordConfirmation,
        username,
        first_name: firstName,
        last_name: lastName,
        tappy_serial_number: tappySerialNumber
      }
      console.log(data);
      const response = await axios.post(`${proxy}/api/user/register`, data);
  
      if (response.data.access_token) {
        localStorage.setItem('accessToken', response.data.access_token);
        props.checkUserSession();
        props.handleHistory("/editProfile");
      } else {
        setError({
          active: true,
          message: response.data.error
        })
      }

    } catch(e) {
      console.log(e);
    }
  } 

  return (
  <div className="register-page">
    <div className="register-page-description">
      <span className="register-page-description-title">Let's get started.</span> 
      <span className="register-page-description-subtitle">To make an account you'll need to have purchased a tappy already. If you don't have one, purchase it <a href="#">here.</a></span>
    </div>
    <Form className="register-form">
      {error.active && (
          <Error error={error} />
      )}
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Your First Name</Form.Label>
        <Form.Control 
          type="email"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)} />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Your Last Name</Form.Label>
        <Form.Control 
          type="email"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)} />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Username (no special characters)</Form.Label>
        <Form.Control 
        type="email"
        value={username}
        onChange={(event) => setUsername(event.target.value)} />
        <Form.Text className="text-muted">
        Your Tappy link will be tappy.tech/(username)
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}  />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}  />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control 
        type="password"
        value={passwordConfirmation}
        onChange={(event) => setPasswordConfirmation(event.target.value)}  />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Tappy Serial Number</Form.Label>
        <Form.Control 
        type="email"
        value={tappySerialNumber}
        onChange={(event) => setTappySerialNumber(event.target.value)} />
      </Form.Group>

      <Form.Group className="disclaimer" controlId="formBasicCheckbox">
        {/* <Form.Check type="checkbox" className="disclaimer-content" label="By creating an account you agree to our Privacy Policy and terms of service" /> */}
        <Form.Label className="disclaimer-content">By creating an account you agree to our Privacy Policy and terms of service</Form.Label>
      </Form.Group>

      <div className="register-page-create-account__btn__wrapper">
        <a className="register-create-account" onClick={() => handleRegister()}>
          Create account
          <svg width="17" height="9" viewBox="0 0 17 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.192017 4.68964H15.648M15.648 4.68964L12.888 1.37927M15.648 4.68964L12.888 8" stroke="white" stroke-width="2"/>
          </svg>
        </a>
      </div>
    </Form>
  </div>
);
}
