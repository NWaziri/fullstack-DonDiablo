import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";

import styles from "./NavBar.module.css"
import Button from "../Button/Button";

function NavBar() {
    const { user, logout } = useContext(AuthContext)

    return (
        <nav className={styles.menu}>
            <ul className={styles.items}>
                <li className={styles.item}>
                    <Link to="/" className={styles['text-link']}>Home</Link>
                </li>
                <li className={styles.item}>
                    <Link to="/signup" className={styles['text-link']}>Registreren</Link>
                </li>
                <li className={styles.item}>
                    <Link to="/login" className={styles['text-link']}>Inloggen</Link>
                </li>
                <li className={styles.item}>
                    <Link to="/profile" className={styles['text-link']}>Profiel</Link>
                </li>
                {user && user.role === "ROLE_ADMIN" &&
                    <li className={styles.item}>
                        <Link to="/admin" className={styles['text-link']}> Admin </Link>
                    </li>
                }
            </ul>
            {user &&
            <Button
                type="submit"
                className={styles[`logout-button`]}
                text="Uitloggen"
                onClick={logout}
            />
            }
        </nav>
    )
}

export default NavBar;