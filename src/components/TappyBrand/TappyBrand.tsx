import "./TappyBrand.scss";
import React from "react";

interface Props {

}

export const TappyBrand: React.FC<Props> = () => {
  return (
  <div className="tappy-brand">
    <span className="tappy-brand-title__wrapper">
      <span className="tappy-brand-title">tappy</span>
      <span className="tappy-brand-title-tm">&#8482;</span>
    </span>
    <span className="tappy-brand-subtitle">The future of networking</span>
  </div>);
}


