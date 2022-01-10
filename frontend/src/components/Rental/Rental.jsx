import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { RentModal } from '../RentModal/RentModal';

import styles from './Rental.module.scss';

export const Rental = ({
    name,
    checkedPrices,
    setCheckedPrices,
    modalOpen,
    toggleModal,
    vehicleId
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
        if (checked && checkedPrices[name] === undefined) {
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
                    vehicleId={vehicleId}
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

const RentalPriceChecked = ({ vehicleId, price, modalOpen, toggleModal }) => {
    return (
        <>
            <td className={styles.rentPrice}>{price} zł</td>
            <td className={styles.rentButton} onClick={toggleModal}>
                RENT
            </td>
            <RentModal
                isOpen={modalOpen}
                onRequestClose={toggleModal}
                pricePerDay={price}
                vehicleId={vehicleId}
            ></RentModal>
        </>
    );
};