import React from 'react';

import styles from './Button.module.scss';

export const Button = (props) => {
    return (
        <div style={{ width: props.width }} className={styles.container}>
            {props.text}
        </div>
    );
};
