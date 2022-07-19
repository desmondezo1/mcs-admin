import React from "react";
import NavLinkDropDown from "../components/atoms/NavLinkDropDown";

function index(props) {
  return (
    <div
      style={{
        height: "100vh",
      }}
      
      className="d-flex align-items-center justify-content-center  w-100"
    >
      <NavLinkDropDown />
    </div>
  );
}

export default index;
