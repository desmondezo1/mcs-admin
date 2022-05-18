import React from "react";

DownArrow.defaultProps = {
  fill: "none",
  stroke: "#999",
};

function DownArrow({ stroke, fill, ...rest }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15.175"
      height="14.372"
      viewBox="0 0 15.175 14.372"
      {...rest}
    >
      <g
        id="Group_2179"
        data-name="Group 2179"
        transform="translate(-5952.234 -321.418)"
      >
        <line
          id="Line_1452"
          data-name="Line 1452"
          y2="13.771"
          transform="translate(5959.822 321.418)"
          fill={fill}
          stroke={stroke}
          strokeMiterlimit="10"
          strokeWidth="1"
        />
        <path
          id="Path_1161"
          data-name="Path 1161"
          d="M5967.056,327.849l-7.234,7.234-7.234-7.234"
          fill={fill}
          stroke={stroke}
          strokeMiterlimit="10"
          strokeWidth="1"
        />
      </g>
    </svg>
  );
}

export default DownArrow;
