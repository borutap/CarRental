import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import styles from './RentedItem.module.scss';

import { ArrowIcon } from '../ArrowIcon/ArrowIcon';
import { RentModal } from '../RentModal/RentModal';

export const RentedItem = ({
    imageUrl,
    year,
    power,
    capacity,
    description,
    brand,
    model
}) => {
    const [expanded, setExpanded] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const rentStart = "14/12/2021";
    const rentEnd = "17/12/2021";
    const fullPrice = "1420zł";

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    }
        
    return (
        // laczy styles.container ze styles.expaneded jezeli expanded true
        // <div className={classNames(styles.container, {[styles.expanded] : expanded})}>
        <div className={styles.container}>
            <div className={styles.topContainer}>
                <div className={styles.imgContainer}>
                    <img draggable={false} src={imageUrl} />
                </div>
                <div className={styles.topInfoContainer}>
                    <div className={styles.topNameAndButton}>                    
                        <div className={styles.header}>
                            {brand + ' ' + model}                                   
                        </div>                
                        <div className={styles.returnButton}>
                            RETURN
                        </div>
                    </div>
                    <div className={styles.rentInfo}>
                        <p style={{margin: 0, wordSpacing: "4px"}}>Rented on {rentStart}</p>
                        <p style={{margin: 0, wordSpacing: "4px"}}>Until {rentEnd} for {fullPrice}</p>
                    </div>
                </div>
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
                <span className={styles.thicc}>Year: </span >
                {year}
            </p>
            <p className={styles.mainDetails}>
                <span className={styles.thicc}>Power: </span >
                {power}
            </p>
            <p className={styles.mainDetails}>
                <span className={styles.thicc}>Capacity: </span >
                {capacity}
            </p>
            <p className={styles.description}>{description}</p>
        </>
    );
};
