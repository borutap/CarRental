import React, { useState } from 'react';

import classNames from 'classnames';

import styles from './HistoryItem.module.scss';
import { OkIcon } from '../OkIcon/OkIcon';
import { NoIcon } from '../NoIcon/NoIcon';
import { ArrowIcon } from '../ArrowIcon/ArrowIcon';

export const HistoryItem = ({
    imageUrl,
    brand,
    model,
    startDate,
    endDate,
    year,
    power,
    capacity,
    description,
}) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className={styles.container}>
            <div className={styles.topContainer}>
                <div className={styles.imgContainer}>
                    <img draggable={false} src={imageUrl} />
                </div>
                <div className={styles.header}>{brand + ' ' + model}</div>
                <div className={styles.header}>
                    {startDate + ' - ' + endDate}
                </div>
            </div>
            <div className={styles.midContainer}>
                {CheckDate(endDate) ? (
                    <div>
                        <OkIcon />
                        Returned
                    </div>
                ) : (
                    <div>
                        <NoIcon />
                        Not Returned
                    </div>
                )}
            </div>
            <div className={styles.bottomContainer}>
                {expanded && (
                    <>
                        <div className={styles.bottomCarDetails}>
                            <VehicleDetails
                                year={year}
                                power={power}
                                capacity={capacity}
                                description={description}
                            />
                        </div>
                    </>
                )}
            </div>
            <div
                className={styles.expandToggle}
                onClick={() => setExpanded(!expanded)}
            >
                {'Show ' + (expanded ? 'less' : 'more')}
                <div
                    className={classNames(styles.expandIcon, {
                        [styles.expanded]: expanded,
                    })}
                >
                    <ArrowIcon />
                </div>
            </div>
        </div>
    );
};

const VehicleDetails = ({ year, power, capacity, description }) => {
    return (
        <>
            <p className={styles.mainDetails}>
                <b>Year: </b>
                {year}
            </p>
            <p className={styles.mainDetails}>
                <b>Power: </b>
                {power}
            </p>
            <p className={styles.mainDetails}>
                <b>Capacity: </b>
                {capacity}
            </p>
            <p className={styles.description}>{description}</p>
        </>
    );
};

const CheckDate = function (checkDate) {
    if (Date.parse(checkDate) < new Date()) {
        return true;
    }

    return false;
};
