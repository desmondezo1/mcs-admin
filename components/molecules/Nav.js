import React from "react";
import NavLink from "../atoms/NavLink";
import NavArray from "../../config/NavArray";
import style from "../../styles/molecule.module.css";
import NavLinkDropDown from "../atoms/NavLinkDropDown";

function Nav(props) {
  return (
    <div className="nav_container">
      <h4
        className="underlined_text"
        style={{
          marginBottom: "30px",
        }}
      >
        DASHBOARD
      </h4>
      <div className={style.nav_container}>
        {NavArray.map(({ display, href, subList }, id) =>
          subList ? (
            <NavLinkDropDown
              display={display}
              href={href}
              subList={subList}
              key={id}
            />
          ) : (
            <NavLink href={href} key={id}>
              {display}
            </NavLink>
          )
        )}
      </div>
    </div>
  );
}

export default Nav;
