import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Header.module.scss';

import { CarIcon } from '../CarIcon/CarIcon';
import { UserIcon } from '../UserIcon/UserIcon';

export const Header = () => {
    return (
        <nav className={styles.container}>
            <div className={styles.innerContainer}>
                <div className={styles.nameContainer}>
                    <CarIcon />
                    <div className={styles.nameText}>CAR RENTAL</div>
                </div>
                <div className={styles.menuContainer}>
                    <NavLink
                        exact
                        activeClassName={styles.active}
                        className={styles.linkText}
                        to="/history"
                    >
                        <span>History</span>
                    </NavLink>
                    <NavLink
                        exact
                        activeClassName={styles.active}
                        className={styles.linkText}
                        to="/rented"
                    >
                        <span>Rented</span>
                    </NavLink>
                    <NavLink
                        exact
                        activeClassName={styles.active}
                        className={styles.linkText}
                        to="/"
                    >
                        <span>Search</span>
                    </NavLink>
                </div>
                <UserIcon />
            </div>
        </nav>
    );
};
