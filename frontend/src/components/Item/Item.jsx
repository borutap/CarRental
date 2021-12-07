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
                <div className={styles.header}>
                    {brand + ' ' + model}
                </div>
            </div>
            <div className={styles.expandToggle} onClick={() => setExpanded(!expanded)}>
                {'Show ' + (expanded ? 'less' : 'more')}
                <div className={classNames(styles.expandIcon, {[styles.expanded]: expanded})}>
                    <ArrowIcon/>
                </div>
            </div>
        </div>
    );
};

/*
            <div className={styles.headerContainer}>
                <div className={styles.imgContainer}>
                    <img src={imageUrl} />
                </div>
                <div className={styles.name}>
                    <VehicleInfo brand={brand} model={model} />
                </div>
                <div className={styles.buttons}>
                    <p className={styles.priceText}>1000zł</p>
                    <div onClick={() => setExpanded(!expanded)}>
                        <Button width={100} text="Car details" />
                    </div>
                    <Button width={100} text="Rent" />
                </div>
            </div>
            <div className={styles.fullText}>
                {expanded && (
                    <VehicleDetails
                        year={year}
                        power={power}
                        capacity={capacity}
                        description={description}
                    />
                )}
            </div>

*/

const VehicleDetails = ({ year, power, capacity, description }) => {
    return (
        <>
            <p>
                <b>Production year: {year}</b>
            </p>
            <p>
                <b>Power: {power}</b>
            </p>
            <p>
                <b>Capacity: {capacity}</b>
            </p>
            <p>{description}</p>
        </>
    );
};
