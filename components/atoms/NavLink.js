import { useRouter } from "next/router";
import Link from "next/link";
import PropTypes from "prop-types";

import Button from "./Buttons";

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  exact: PropTypes.bool,
};

NavLink.defaultProps = {
  exact: false,
};

function NavLink({ href, exact, children, ...props }) {
  const { pathname } = useRouter();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link href={href}>
      <Button
        {...props}
        color={isActive ? "primary" : "secondary"}
        style={{
          width: "100%",
        }}
        margin="10px 0"
      >
        {children}
      </Button>
    </Link>
  );
}

export default NavLink;
