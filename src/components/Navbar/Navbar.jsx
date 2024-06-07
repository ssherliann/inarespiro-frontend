import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { IoCartOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { Button } from "@chakra-ui/react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { loggedIn, user } = useAuth();

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Link to="/">inarespiro</Link>
        </div>
        <ul className={styles.menu}>
          <li>
            <Link to="/products">Our Products</Link>
          </li>
        </ul>
      </div>
      <div className={styles.right}>
          {!loggedIn && (
            <>
              <Link to="/signin">
                <Button className={styles.buttonLogin}>Log in</Button>
              </Link>
            </>
          )}
          {loggedIn && (
            <>
              <Link to="/profile">
                <VscAccount className={styles.iconProfile}/>
              </Link>
              <Link to="/basket">
                <IoCartOutline className={styles.iconCart}/>
              </Link>
              {user?.role === "admin" && (
                <Link to="/admin">
                  <Button>
                    Admin
                  </Button>
                </Link>
              )}
            </>
          )}
        </div>
    </nav>
  );
}

