import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import styles from './Item.module.scss';

import { ArrowIcon } from '../ArrowIcon/ArrowIcon';
import { RentModal } from '../RentModal/RentModal';

export const Item = ({
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
                                            apiBaseUrl={r.apiBaseUrl}
                                            checkedPrices={checkedPrices}
                                            setCheckedPrices={setCheckedPrices}
                                            modalOpen={modalOpen}
                                            toggleModal={toggleModal}
                                        />
                                    );
                                })}
                                </tbody>
                            </table>
                            {/* <div
                                className={styles.oldRentButton}
                                onClick={toggleModal}
                            >
                                RENT
                            </div> */}
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

const Rental = ({
    name,
    apiBaseUrl,
    checkedPrices,
    setCheckedPrices,
    modalOpen,
    toggleModal,
}) => {
    const [checked, setChecked] = useState(checkedPrices[name] !== undefined);
    const [loading, setLoading] = useState(false);
    const [outputText, setOutputText] = useState('CHECK');

    const [fakeFetch, setFakeFetch] = useState();

    const handleCheckPrice = async () => {
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
            setLoading(true);
            setOutputText('...');

            fakeFetch
                .then(() => {
                    setChecked(true);
                })
                .catch(() => {
                    setOutputText('ERROR');
                });
        }
    }, [fakeFetch]);

    useEffect(() => {
        if (checked) {
            let price = (1000 + Math.random() * 600).toFixed();
            setCheckedPrices({ ...checkedPrices, [name]: price });
        }
    }, [checked]);

    return (
        <tr>
            <td className={styles.rentName}>{name}</td>
            {!checked ? (
                <RentalPriceUnChecked
                    handleCheckPrice={handleCheckPrice}
                    outputText={outputText}
                    loading={loading}
                />
            ) : (
                <RentalPriceChecked
                    price={checkedPrices[name]}
                    modalOpen={modalOpen}
                    toggleModal={toggleModal}
                />
            )}
        </tr>
    );
};

const RentalPriceUnChecked = ({ handleCheckPrice, outputText, loading }) => {
    return (
        <td>
            <div
                className={classNames(styles.checkButton, {
                    [styles.loadingPrice]: loading,
                })}
                onClick={handleCheckPrice}
            >
                {outputText}
            </div>
        </td>
    );
};

const RentalPriceChecked = ({ price, modalOpen, toggleModal }) => {
    return (
        <>
            <td className={styles.rentPrice}>{price} zł</td>
            <td className={styles.rentButton} onClick={toggleModal}>
                RENT
            </td>
            <RentModal
                isOpen={modalOpen}
                onRequestClose={toggleModal}
            ></RentModal>
        </>
    );
};
