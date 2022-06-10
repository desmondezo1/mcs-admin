import React from "react";

import Image from "next/image";
import NotificationTab from "./NotificationTab";
import ProfileImageIcon from "../../images/icons/ProfileImageIcon";

import Logo from "../../images/Logo.png";
function Header({ children }) {
  return (
    <div className="d-flex flex-column  w-100">
      <nav className="d-flex w-100 flex-row justify-content-between p-3">
        <Image src={Logo} alt="logo" />

        <div
          style={{
            display: "flex",
            flexFlow: "row nowrap",
            alignItems: "center",
            justifyContent: "space-between",
            width: "170px",
          }}
        >
          <NotificationTab />
          <ProfileImageIcon />
          {children}
        </div>
      </nav>
    </div>
  );
}

export default Header;
