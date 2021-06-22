import "./Login.scss";
import React, { useState } from "react";
import { Form, Container } from "react-bootstrap";
import { TappyBrand } from "../TappyBrand/TappyBrand";
import { SignInButton } from "../SignInButton/SignInButton";
import { RegisterButton } from "../RegisterButton/RegisterButton";
import { Socials } from "../Socials/Socials";
import { Link } from "react-router-dom";
import axios from "axios";
import { Error } from "../Error/Error";

interface Props {
  checkUserSession: () => void;
  handleHistory: (url: string) => void;
}

const proxy = process.env.REACT_APP_PROXY_DEVELOPMENT;


export const Login: React.FC<Props> = (props) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    active: false,
    message: ""
  })


  const handleLogin = async () => {
    const data = {
      email: username,
      password
    }

    const response = await axios.post(`http://3.142.144.138/tappy-back/server.php/api/user/login`, data);
    if (response.data.access_token) {
      localStorage.setItem('accessToken', response.data.access_token);
      props.checkUserSession();
      props.handleHistory('/profile');
    } else {
      setError({
        active: true,
        message: response.data.error
      })
    }
    console.log(response);
  } 

  return (
    <Container className="login__wrapper">
      <span className="login__welcome-back">Welcome back 👋</span>
      {error.active && (
        <Error error={error} />
      )}
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Control 
          type="email" 
          placeholder="username / email"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}/>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Control 
          type="password" 
          placeholder="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }} />
        </Form.Group>
        <div className="login-call-to-action__wrapper">
          <SignInButton 
          text="Sign in" 
          onclick={handleLogin} 
          handleHistory={props.handleHistory} />
          <Link to="/resetPassword">
            <a className="forgot-password">forgot password?</a>
          </Link>
        </div>

      </Form>
      <div className="no-account__wrapper">
        <span className="no-account">no account yet?</span>
        <RegisterButton text="Create an account" />
      </div>
      {/* <Socials /> */}
    </Container>
  );
}

