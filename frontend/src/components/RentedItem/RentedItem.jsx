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
    const [loading, setLoading] = useState(true);

    const [fakeFetch, setFakeFetch] = useState();
    const [info, setInfo] = useState({
        rentStart: "...",
        rentEnd: "...",
        fullPrice: "...",
        rentalName: "..."
    });
        
    useEffect(() => {
        if (loading) {
            handleCheckInfo();
        }          
    }, [loading])

    const handleCheckInfo = async () => {
        // fetch(/api/nazwa)
        setFakeFetch(
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, 500);
            })
        );
    };
    
    useEffect(() => {
        if (fakeFetch) {
            fakeFetch
                .then(() => {
                    setInfo({
                        rentStart: "14/12/2021",
                        rentEnd: "17/12/2021",
                        fullPrice: "1000zł",
                        rentalName: "Dluzszanazwa",
                    });
                })
                .catch(() => {
                    setInfo({
                        rentStart: "unavailable",
                        rentEnd: "unavailable",
                        fullPrice: "unavailable",
                        rentalName: "unavailable",
                    });
                });
            setLoading(false);
        }
    }, [fakeFetch]);    

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
                        <div className={styles.returnButton}>RETURN</div>
                    </div>
                    <div className={styles.rentInfo}>
                        <p>Rented on {info.rentStart}</p>
                        <p>
                            Until {info.rentEnd} for {info.fullPrice} from{' '}
                            {info.rentalName}
                        </p>
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
