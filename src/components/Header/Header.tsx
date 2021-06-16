import "./Header.scss";
import React, { useState } from "react";
import {
  Navbar,
  Button
} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { TappyLogo } from "../TappyLogo/TappyLogo";
import HamburgerMenu from "react-hamburger-menu";
import { NavLink } from "../NavLink/NavLink";

interface State {
  session: number;
  userData:{};
}

interface Props {
  title: string;
  handleLogout: () => void;
  handleHistory: (url: string) => void;
  state: State;
}

export const Header: React.FC<Props> = (props) => {

  const [toggled, setToggled] = useState(false);

  return(
    <>
      <Navbar className="main-header" collapseOnSelect expand="lg" variant="dark">
        <div 
        onClick={() => {
          
        }} 
        className="navbar-toggle">
         {/* <svg height="384pt" viewBox="0 -53 384 384" width="384pt" xmlns="http://www.w3.org/2000/svg"><path d="m368 154.667969h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"/><path d="m368 32h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"/>
            <path d="m368 277.332031h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"/>
         </svg> */}
         <HamburgerMenu 
          isOpen={toggled}
          menuClicked={() => setToggled(!toggled)}
          width={30}
          height={20}
          strokeWidth={2}
          rotate={0}
          color='white'
          borderRadius={0}
          animationDuration={0.5}
         />
        </div>
        <Navbar.Brand href="#home">
        <Link to={props.state.session === -1 ? "/":"/profile"}>
          <TappyLogo />
        </Link>
      </Navbar.Brand>
      </Navbar>
      {toggled && (
      <div className="openNavbar">
        <div className="navbar__content">
          <div className="navbar__list">
            {props.state.session !== -1 && (
              <>
              <NavLink
              label="Profile"
              destination="/profile"
              handleHistory={props.handleHistory}
              toggleHeader={setToggled}
              />
              <NavLink
                label="Profile Editor"
                destination="/editProfile"
                handleHistory={props.handleHistory}
                toggleHeader={setToggled}
              />
              <NavLink
                label="Account Settings"
                destination="/accountSettings"
                handleHistory={props.handleHistory}
                toggleHeader={setToggled}
              />
              </>
            )}
            
            <NavLink
              label="Tappy For Business"
              destination="/"
              handleHistory={props.handleHistory}
              toggleHeader={setToggled}
            />
            <NavLink
              label="Tappy VIP Club"
              destination="/"
              handleHistory={props.handleHistory}
              toggleHeader={setToggled}
            />
            <NavLink
              label="Contact Us"
              destination="/"
              handleHistory={props.handleHistory}
              toggleHeader={setToggled}
            />
          </div>
          <div className="navbar__footer">
            {props.state.session !== -1 ? (
              <Button
              onClick={() => {
                props.handleLogout();
                setToggled(false);
              }}
              >Sign out</Button>
            ):(
              <Button
              onClick={() => {
                props.handleHistory("/login");
                setToggled(false);
              }}
              >Sign in</Button>
            )}
          </div>
        </div>
      </div>
      )}
      
    </>
  
  )
}