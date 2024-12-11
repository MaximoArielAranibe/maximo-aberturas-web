import React from "react";

export const Title = ({ title, titleStyle }) => {
  return (
    <h1 className={titleStyle}>{title}</h1>
  );
}

