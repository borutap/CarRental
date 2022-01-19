import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Header.module.scss';
import { UserContext } from '../../app/App'
import { CarIcon } from '../CarIcon/CarIcon';

import { GoogleLogin } from 'react-google-login';
import GoogleButton from 'react-google-button'

export const Header = ({setRole}) => {
    
    const role = useContext(UserContext);
    const [placeholderRole, setPlaceHolderRole] = useState("client");

    const [isLoggedIn, setIsLoggedIn] = useState(role !== "guest");
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const googleResponse = (resp) => {
        const profile = resp.profileObj;        
        setName(`${profile.familyName} ${profile.givenName}`);
        setEmail(profile.email);
        setImageUrl(profile.imageUrl);
        localStorage.setItem("googleIdToken", resp.tokenId);
        setIsLoggedIn(true);
    }

    const onLogoutSuccess = () => {
        console.log('logout success');
        localStorage.removeItem("googleIdToken");
        localStorage.removeItem("access_token");
        localStorage.removeItem("t_access_token");
        setIsLoggedIn(false);
    };

    const onLogoutFailure = () => {
        console.log('logout failure');
    };

    const signOut = () => {
        const auth2 = window.gapi.auth2.getAuthInstance();
        if (auth2 != null) {
            auth2
                .signOut()
                .then(auth2.disconnect().then(onLogoutSuccess));
        } else {
            onLogoutFailure();
        }
    }

    useEffect(() => {
        console.log(`isLogged: ${isLoggedIn}`);
        if (isLoggedIn) {
            if (localStorage.getItem("role") !== "guest") {
                return;
            }
            setRole(placeholderRole);
            localStorage.setItem("role", placeholderRole);
            console.log("Logged in");
            setAccessToken();
        } else {
            setRole("guest");
            localStorage.setItem("role", "guest");
        }       
    }, [isLoggedIn])

    const setAccessToken = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                googleIdToken: localStorage.getItem("googleIdToken"),
                role: localStorage.getItem("role")
            }),
        };
        try {
            console.log(requestOptions);
            const response = await fetch('https://localhost:44329/login', requestOptions);
            const data = await response.json();            
            console.log(data);
            if (data[0].access_token === null && data[1].access_token === null) {
                alert('Both identity servers are probably down');
                return;
            }
            if (data[0].access_token === null) {
                alert('Our identity server is probably down');
                localStorage.setItem("t_access_token", data[1].access_token);
                return;
            }
            if (data[1].access_token === null) {
                alert('Teacher\'s identity server is probably down');
                localStorage.setItem("access_token", data[0].access_token);
                return;
            }
            localStorage.setItem("access_token", data[0].access_token);
            localStorage.setItem("t_access_token", data[1].access_token);
        } catch (e) {
            alert('Could not fetch access token: ' + e.message);
        }
    }

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
                    {role !== 'guest' && (
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
                {!isLoggedIn && (
                    <RoleChoice
                        currentRole={placeholderRole}
                        setPlaceholderRole={setPlaceHolderRole}
                    />
                )}
                {/* <UserIcon /> */}
                {isLoggedIn && (
                    <div className={styles.userContainer}>
                        <img
                            draggable="false"
                            src={imageUrl}
                            title={name + ' ' + email}
                        />
                        {/* <div className={styles.userInfo}>
                            <div>{name}</div>
                            <div>{email}</div>
                        </div> */}
                    </div>
                )}
                <GoogleLogin
                    clientId="438661257726-oqgj0dm34f9cdivvucr4evlf2ppk90je.apps.googleusercontent.com"
                    buttonText="Login"
                    render={(renderProps) => (
                        <GoogleButton
                            style={!isLoggedIn ? { width: 100 } : { width: 0, height: 0, visibility: 'hidden' }}
                            label="Sign in"
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                        />
                                                    
                    )}
                    onSuccess={googleResponse}
                    // TODO cos na failure
                    onFailure={googleResponse}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                    theme="dark"
                />
                {isLoggedIn && <svg onClick={signOut} className="logoutIcon" width="491" height="374" viewBox="0 0 491 374" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M0 63.05V311.25C0 345.45 27.9 373.35 62.1 373.35H262.7C296.9 373.35 324.8 345.45 324.8 311.25V271.05C324.8 264.25 319.3 258.75 312.5 258.75C305.7 258.75 300.2 264.25 300.2 271.05V311.25C300.2 331.95 283.3 348.85 262.6 348.85H62.1C41.4 348.85 24.5 331.95 24.5 311.25V63.05C24.5 42.35 41.4 25.45 62.1 25.45H262.7C283.4 25.45 300.3 42.35 300.3 63.05V103.25C300.3 110.05 305.8 115.55 312.6 115.55C319.4 115.55 324.9 110.05 324.9 103.25V63.05C324.9 28.85 297 0.949997 262.8 0.949997H62.1C27.9 0.949997 0 28.75 0 63.05Z" fill="#222222"/> <path d="M385.4 279.65C387.8 282.05 390.9 283.25 394.1 283.25C397.3 283.25 400.4 282.05 402.8 279.65L486.7 195.75C491.5 190.95 491.5 183.25 486.7 178.45L402.8 94.55C398 89.75 390.3 89.75 385.5 94.55C380.7 99.35 380.7 107.05 385.5 111.85L448.5 174.85H218.6C211.8 174.85 206.3 180.35 206.3 187.15C206.3 193.95 211.8 199.45 218.6 199.45H448.4L385.4 262.45C380.6 267.15 380.6 274.95 385.4 279.65Z" fill="#222222"/> </svg>}
                <div style={{ paddingLeft: 5 }}>role: {role}</div>
            </div>
        </nav>
    );
};

    
const RoleChoice = ({ currentRole, setPlaceholderRole }) => {

    const onChange = (e) => {
        const role = e.target.value;
        console.log("change " + role);
        setPlaceholderRole(role);
    }

    return (
        <>
        <div style={{paddingRight: 7}}>
            Sign in as
        </div>
        <div style={{paddingRight: 15}}>            
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
        </div>
        </>
    );
}
