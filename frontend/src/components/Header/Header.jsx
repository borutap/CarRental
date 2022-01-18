import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Header.module.scss';
import { UserContext } from '../../app/App'
import { CarIcon } from '../CarIcon/CarIcon';
import { UserIcon } from '../UserIcon/UserIcon';

export const Header = ({setRole}) => {
    
    const role = useContext(UserContext);


    return (
        <nav className={styles.container}>
            <div className={styles.innerContainer}>
                <NavLink exact to="/">
                    <div className={styles.nameContainer}>
                        <CarIcon />
                        <div className={styles.nameText}>CAR RENTAL</div>
                    </div>
                </NavLink>
                <div className={styles.menuContainer}>
                    {role !== "guest" && (
                        <>
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
                        </>
                    )}
                    <NavLink
                        exact
                        activeClassName={styles.active}
                        className={styles.linkText}
                        to="/"
                    >
                        <span>Search</span>
                    </NavLink>
                </div>
                <RoleChoice currentRole={role} setRole={setRole} />
                <UserIcon />
                {role}
            </div>
        </nav>
    );
};

    
const RoleChoice = ({ currentRole, setRole }) => {

    const onChange = (e) => {
        const role = e.target.value;
        console.log(role);
        setRole(role);
        localStorage.setItem("role", role);
    }

    return (
        <>
            <label>
                <input
                    type="radio"
                    name="role"
                    value="client"
                    checked={currentRole === "client"}
                    onChange={onChange}
                />{' '}
                Client
            </label>
            <label>
                <input
                    type="radio"
                    name="role"
                    value="worker"
                    checked={currentRole === "worker"}
                    onChange={onChange}
                />{' '}
                Worker
            </label>
            <label>
                <input
                    type="radio"
                    name="role"
                    value="guest"
                    checked={currentRole === "guest"}
                    onChange={onChange}
                />{' '}
                Guest
            </label>
        </>
    );
}
