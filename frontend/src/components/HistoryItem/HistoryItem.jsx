import React, { useState } from 'react';
import classNames from 'classnames';
import formatJsonDate from '@lib/formatJsonDate';

import styles from './HistoryItem.module.scss';
import { OkIcon } from '../OkIcon/OkIcon';
import { NoIcon } from '../NoIcon/NoIcon';
import { ArrowIcon } from '../ArrowIcon/ArrowIcon';
import { VehicleDetails } from '../VehicleDetails/VehicleDetails';

export const HistoryItem = ({
    imageUrl,
    rentId,
    brand,
    model,
    rentStart,
    rentEnd,
    year,
    power,
    capacity,
    description,
    returnTime
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
                        From {formatJsonDate(rentStart)}
                    </div>
                    <div>
                        Until {formatJsonDate(rentEnd)}
                    </div>
                </div>
            </div>
            <div className={styles.midContainer}>
                {checkDate(returnTime) ? (
                    <div className={styles.returned}>
                        <OkIcon />
                        Returned ({formatJsonDate(returnTime)})
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

const checkDate = (returnTime) => {
    return returnTime === null ? false : true;
};
