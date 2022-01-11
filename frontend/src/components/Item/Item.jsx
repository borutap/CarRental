import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import styles from './Item.module.scss';

import { ArrowIcon } from '../ArrowIcon/ArrowIcon';
import { Rental } from '../Rental/Rental';
import { VehicleDetails } from '../VehicleDetails/VehicleDetails';

export const Item = ({
    id,
    imageUrl,
    year,
    power,
    capacity,
    description,
    brand,
    model,
    possibleRentals
}) => {
    const [expanded, setExpanded] = useState(false);    
    const [modalOpen, setModalOpen] = useState(false);
    
    const toggleModal = () => {
        setModalOpen(!modalOpen);
    }
    
    // para klucz - nazwa wypozyczalni, wartosc - cena auta w niej
    const [checkedPrices, setCheckedPrices] = useState({});

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
                                <tbody>
                                {possibleRentals.map((r) => {
                                    return (
                                        <Rental
                                            key={r.id}
                                            name={r.name}
                                            vehicleId={id}
                                            checkedPrices={checkedPrices}
                                            setCheckedPrices={setCheckedPrices}
                                            modalOpen={modalOpen}
                                            toggleModal={toggleModal}
                                        />
                                    );
                                })}
                                </tbody>
                            </table>
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