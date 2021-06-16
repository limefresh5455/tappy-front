import "./Default.scss";
import React from "react";
import { Socials } from "../Socials/Socials";
import { TappyBrand } from "../TappyBrand/TappyBrand";
import { SignInButton } from "../SignInButton/SignInButton";
import { RegisterButton } from "../RegisterButton/RegisterButton";
 

interface Props {
  handleHistory: (url: string) => void;
}

export const Default: React.FC<Props> = (props) => {
  return (
    <>
    <div className="homepage">
      <TappyBrand />
      <div className="homepage-call-to-action__wrapper">
        <SignInButton text="Sign in"
         handleHistory={props.handleHistory} />
        <RegisterButton text="Create an account" />
      </div>
    </div>
    <Socials />
    </>
  );
}
