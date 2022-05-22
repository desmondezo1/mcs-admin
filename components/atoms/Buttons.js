import React from "react";
import PropTypes from "prop-types";

import style from "../../styles/atoms.module.css";

Buttons.defaultProps = {
  size: "large",
  alignText: "space-between",
};

Buttons.propTypes = {
  color: PropTypes.oneOf([
    "Received",
    "Cancelled",
    "Shipped",
    "Pending",
    "primary",
    "secondary",
  ]),
};
function Buttons({
  onClick,
  children,
  color,
  size,
  alignText,
  className,
  fontSize,
  margin,
  ...rest
}) {
  return (
    <button
      onClick={onClick}
      className={`
      
      ${className}
      ${style.button} ${style[color]}
      
      
      `}
      {...rest}
      style={{
        justifyContent: `${alignText}`,
        fontSize: fontSize,
        width: `${size ? size : "100%"}`,
        margin: margin,
        alignItems: "center",
      }}
    >
      {children}
    </button>
  );
}

export default Buttons;
