import "./NavLink.scss";
import React from "react";

interface Props {
  label: string;
  destination: string;
  handleHistory: (url: string) => void;
  toggleHeader: (value: boolean) => void;
}

export const NavLink: React.FC<Props> = (props) => {
  return (
    <a
      onClick={() => {
        props.handleHistory(props.destination);
        props.toggleHeader(false);
      }}
    >
      {props.label}
    </a>
  )
}