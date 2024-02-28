import React from "react";

const Volume = () => {
  return <input type="range" max={30} min={-50} defaultValue={1} />;
};

export default Volume;
