import React, { useEffect, useState, useContext } from 'react';
import classNames from 'classnames';
import { RentModal } from '../RentModal/RentModal';
import { UserContext } from '../../App';
import fetchQuoteJson from '../../lib/fetchQuoteJson';

import styles from './Rental.module.scss';

export const Rental = ({
    name,
    baseApiUrl,
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

    const role = useContext(UserContext);

    const handleCheckPrice = async () => {        
        if (name === "Our Rental") {
            setLoading(true);
            setOutputText('...');    
            setOurPrice();        
            return;
        }
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

    const setOurPrice = async () => {
        try {
            // bazowe parametry tutaj
            const quoteJson = await fetchQuoteJson(
                baseApiUrl,
                0,
                0,
                1,
                '',
                vehicleId,
                name === "Our Rental"
            );
            const price = quoteJson['price'];
            console.log(`Our price: ${price}`);
            setChecked(true);
            setLoading(false);
            setCheckedPrices({ ...checkedPrices, [name]: price }); 
        } catch (e) {
            alert(e.message);
            setLoading(false);
            setOutputText('ERROR');
        }
    }

    useEffect(() => {
        if (checked && checkedPrices[name] === undefined) {
            let price = 0;
            if (name !== "Our Rental") {                
                price = (1000 + Math.random() * 600).toFixed();
                setCheckedPrices({ ...checkedPrices, [name]: price }); 
            }                                   
        }
    }, [checked]);

    return (
        <tr>
            <td className={styles.rentName}>{name}</td>
            {role === "client" && (
            !checked ? (
                <RentalPriceUnChecked
                    handleCheckPrice={handleCheckPrice}
                    outputText={outputText}
                    loading={loading}
                />
            ) : (
                <RentalPriceChecked
                    vehicleId={vehicleId}
                    baseApiUrl={baseApiUrl}
                    price={checkedPrices[name]}
                    modalOpen={modalOpen}
                    toggleModal={toggleModal}
                />
            ))}
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

const RentalPriceChecked = ({ vehicleId, baseApiUrl, price, modalOpen, toggleModal }) => {
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
                baseApiUrl={baseApiUrl}
            ></RentModal>
        </>
    );
};