import React, { forwardRef } from "react";
import "../styles/inputs.css";

const Button = forwardRef((props, ref) => {
  return (
    <label>
      <input type="checkbox" ref={ref} {...props} />
    </label>
  );
});

export default Button;
