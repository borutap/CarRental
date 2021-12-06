import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss'
// const style = {
//     marginTop: "50%"
// };

export const Header = () => {
  return (
    <nav className={styles.container}>      
      <Link className={styles.linkText} to="/">
        <span>Home</span>
      </Link>                      
      <Link className={styles.linkText} to="/menu1">
        <span>menu1</span>
      </Link>
      <span>
        menu2
      </span>
      <span>
        menu3
      </span>
    </nav>
  );    
};