import "./NotFound.scss";
import React from "react";

interface Props {

}

export const NotFound: React.FC<Props> = (props) => {
  return (
    <div className="not-found">
      <span className="not-found__header">404 Not Found</span>
      <span className="not-found__subheader">We weren't able to find what you were looking for.</span>
    </div>
  )
}