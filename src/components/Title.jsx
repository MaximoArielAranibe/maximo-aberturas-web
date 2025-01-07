import React from "react";
import { Link } from "react-router-dom";
import '../styles/title.scss'
export const Title = ({ title, titleStyle, link, toLink }) => {
  return title === undefined ? (
    <Link to={`/categoria/${toLink}`} className={titleStyle} style={{ textDecoration: 'none', display: 'block' }}><h4 className="title__link">{link}</h4></Link>
  ) : (
    <h1 className={titleStyle}>{title}</h1>
  );
};
