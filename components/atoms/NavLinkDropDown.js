import React, { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import atom_style from "../../styles/atoms.module.css";
import DownArrow from "../../images/icons/DownArrow";
import CancelIcon from "../../images/icons/CancelIcon";
import { useRouter } from "next/router";

NavLinkDropDown.propTypes = {};

NavLinkDropDown.defaultProps = {
  display: "PRODOTTI",
  href: "/admin/prodotti",
  subList: [
    {
      display: "Aggiungi Prodotto",
      href: "/",
    },
    {
      href: "/categoria",
      display: "Lista Prodotti",
    },
    {
      display: "Categoria",
      href: "product_list",
    },
  ],
};

function NavLinkDropDown({ display, href, exact, subList }) {
  const [active, setActive] = useState(false);
  const { pathname } = useRouter();
  return (
    <div
      className={`${atom_style.navlink_drop_down} ${
        active && atom_style.active
      }`}
    >
      <button onClick={() => setActive((prev) => !prev)}>
        <span>{display}</span>{" "}
        {active ? <CancelIcon /> : <DownArrow stroke={"black"} />}{" "}
      </button>

      <ul>
        {subList.map(({ display: subListDisplay, href: subListHref }, i) => {
          const finalHref = `${href}${subListHref}`;
          const isActive = exact
            ? pathname === finalHref
            : pathname.startsWith(finalHref);

          return (
            <Link key={i} href={finalHref}>
              <li
                style={{
                  background: `${isActive && "#CCC"}`,
                }}
              >
                {subListDisplay}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

export default NavLinkDropDown;
