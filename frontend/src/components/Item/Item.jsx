import React, { useState } from 'react';
import classNames from 'classnames';

import styles from './Item.module.scss';

import { ArrowIcon } from '../ArrowIcon/ArrowIcon';

export const Item = ({
    imageUrl,
    year,
    power,
    capacity,
    description,
    brand,
    model,
}) => {
    const [expanded, setExpanded] = useState(false);

    return (
        // laczy styles.container ze styles.expaneded jezeli expanded true
        // <div className={classNames(styles.container, {[styles.expanded] : expanded})}>
        <div className={styles.container}>
            <div className={styles.topContainer}>
                <div className={styles.imgContainer}>
                    <img draggable={false} src={imageUrl} />
                </div>
                <div className={styles.header}>{brand + ' ' + model}</div>
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
                        <div className={styles.bottomRentals}>
                            <table>
                                <Rental name="Rental hgw" price="1000 zł" />
                                <Rental name="Dluzszanazwa" price="1400 zł" />
                                <Rental name="bardzodluganazwa" price="1500 zł" />
                                <Rental name="Rental 4" price="1200 zł" />
                            </table>
                            <div className={styles.rentButton}>
                                RENT
                            </div>
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

const Rental = ({ name, price }) => {
    return (
        <tr>
            <td className={styles.rentName}>{name}</td>
            <td className={styles.rentPrice}>{price}</td>
        </tr>  
    );
};
