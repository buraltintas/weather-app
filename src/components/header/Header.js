import { Link, useLocation } from "react-router-dom";
import classes from "./Header.module.css";

const Header = () => {
  const location = useLocation();

  console.log(location);

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <Link
          className={`${classes.navLink} ${
            location.pathname === "/home" ? classes.active : ""
          }`}
          to="/home"
        >
          Home
        </Link>
        <span>|</span>
        <Link
          className={`${classes.navLink} ${
            location.pathname === "/about" ? classes.active : ""
          }`}
          to="/about"
        >
          About
        </Link>
      </nav>
    </header>
  );
};

export default Header;
