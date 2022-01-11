import React from 'react';

import styles from './VehicleDetails.module.scss';

export const VehicleDetails = ({ year, power, capacity, description }) => {
    return (
        <>
            <p className={styles.mainDetails}>
                <span className={styles.thicc}>Year: </span>
                {year}
            </p>
            <p className={styles.mainDetails}>
                <span className={styles.thicc}>Power: </span>
                {power}
            </p>
            <p className={styles.mainDetails}>
                <span className={styles.thicc}>Capacity: </span>
                {capacity}
            </p>
            <p className={styles.description}>{description}</p>
        </>
    );
};