import React, { useState } from 'react';

import styles from './SearchBar.module.scss';

export const SearchBar = ({ setQuery }) => {
    return (
        <div className={styles.container}>
            <input
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Search"
            />
        </div>
    );
};
