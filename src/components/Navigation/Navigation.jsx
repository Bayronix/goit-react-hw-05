// Navigation.js
import { NavLink } from "react-router-dom";
import Styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={Styles.nav}>
      <NavLink
        className={({ isActive }) =>
          isActive ? Styles.activeText : Styles.text
        }
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? Styles.activeText : Styles.text
        }
        to="/movies"
      >
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
