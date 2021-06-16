import "./ContactCardEntry.scss";
import React from "react";

interface Props {
  label: string;
  value: string;
}

export const ContactCardEntry: React.FC<Props> = (props) => {
  return (
    <>
      {
      props.value ?  
        <div className="contact-card__entry">
          <label><b className="text-dark">{props.label}</b></label>
          <p>{props.value}</p>
        </div>
        : null
      }
    </>

  )
}