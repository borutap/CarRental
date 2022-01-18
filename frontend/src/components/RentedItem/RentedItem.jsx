import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import formatJsonDate from '@lib/formatJsonDate';

import styles from './RentedItem.module.scss';

import { UserContext } from '../../app/App';
import { ArrowIcon } from '../ArrowIcon/ArrowIcon';
import { ReturnModal } from '../ReturnModal/ReturnModal';
import { VehicleDetails } from '../VehicleDetails/VehicleDetails';

export const RentedItem = ({
    rentId,
    imageUrl,
    year,
    power,
    capacity,
    description,
    brand,
    model,
    rentStart,
    rentEnd,
}) => {
    const [expanded, setExpanded] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const [hidden, setHidden] = useState(false);

    const [fakeFetch, setFakeFetch] = useState();
    const [info, setInfo] = useState({
        rentStart: '...',
        rentEnd: '...',
        fullPrice: '...',
        client: '...',
    });

    const role = useContext(UserContext);

    useEffect(() => {
        if (loading) {
            handleCheckInfo();
        }
    }, [loading]);

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
                        rentStart: '14/12/2021',
                        rentEnd: '17/12/2021',
                        fullPrice: '1000zł',
                        client: 'client',
                    });
                })
                .catch(() => {
                    setInfo({
                        rentStart: 'unavailable',
                        rentEnd: 'unavailable',
                        fullPrice: 'unavailable',
                        client: 'unavailable',
                    });
                });
            setLoading(false);
        }
    }, [fakeFetch]);

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    return hidden ? (
        <></>
    ) : (
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
                        {role === "worker" &&
                        <>
                            <div
                                className={styles.returnButton}
                                onClick={toggleModal}
                            >
                                RETURN
                            </div>
                            <ReturnModal
                                rentId={rentId}
                                setHidden={setHidden}
                                isOpen={modalOpen}
                                onRequestClose={toggleModal}
                            ></ReturnModal>
                        </>
                        }                        
                    </div>
                    <div className={styles.rentInfo}>
                        <p>
                            Rented for {info.client} on {formatJsonDate(rentStart)}
                        </p>
                        <p>
                            Until {formatJsonDate(rentEnd)}
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
