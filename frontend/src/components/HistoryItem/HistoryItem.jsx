import React, { useState } from 'react';
import classNames from 'classnames';

import styles from './HistoryItem.module.scss';
import { OkIcon } from '../OkIcon/OkIcon';
import { NoIcon } from '../NoIcon/NoIcon';
import { ArrowIcon } from '../ArrowIcon/ArrowIcon';
import { VehicleDetails } from '../VehicleDetails/VehicleDetails';

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
                <div className={styles.topRight}>
                    <div className={styles.topTextContainer}>
                        {brand + ' ' + model}
                    </div>
                    <div>
                        {startDate + ' - ' + endDate}
                    </div>
                </div>
            </div>
            <div className={styles.midContainer}>
                {CheckDate(endDate) ? (
                    <div className={styles.returned}>
                        <OkIcon />
                        Returned
                    </div>
                ) : (
                    <div className={styles.notReturned}>
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
                        <div className={styles.bottomDownload}>
                            <a href="rrz2.pdf" download>
                                Documents.pdf
                            </a>
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

const CheckDate = function (checkDate) {
    if (Date.parse(checkDate) < new Date()) {
        return true;
    }

    return false;
};
