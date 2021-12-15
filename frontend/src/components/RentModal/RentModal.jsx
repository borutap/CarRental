import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import DatePicker from "react-datepicker";

import styles from './RentModal.module.scss';
import "react-datepicker/dist/react-datepicker.css";
//import "./DatePickerStyles.css"

// jest mergowany z domyslnym
const modalStyling = {
    content: {
        top: '15%',
        left: '15%',
        right: '15%',
        bottom: '15%',
    }
}

export const RentModal = ({ pricePerDay, isOpen, onRequestClose }) => {
    const [numberOfDays, setNumberOfDays] = useState(null);

    const handleConfirm = () => {
        if (numberOfDays) {
            // TODO Tutaj call do api
            //console.log(onRequestClose);
            //onRequestClose();
        }
        else {
            // TODO Lepszy error pokazac
            alert("Date not set");
        }        
    };

    return (
        <Modal
            ariaHideApp={false}
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="My dialog"
            style={modalStyling}
        >
            <div className={styles.container}>
                <div className={styles.header}>Rent details</div>

                <div className={styles.body}>
                    <LocationInput />
                    <DaysInput
                        numberOfDays={numberOfDays}
                        setNumberOfDays={setNumberOfDays}
                    />
                    Price: {pricePerDay * numberOfDays}
                </div>

                <div className={styles.footer}>
                    <button onClick={onRequestClose}>Close modal</button>
                    <button onClick={handleConfirm}>Confirm</button>
                </div>
            </div>
        </Modal>
    );
};

const LocationInput = () => {
    return (
        <>
            Location
            <div className={styles.barContainer}>
                <div className={styles.inputBar}>
                    <input type="text" placeholder="Location" />
                </div>
            </div>
        </>
    );
};

const DaysInput = ({numberOfDays, setNumberOfDays}) => {
    const today = new Date();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const oneDay = 24 * 60 * 60 * 1000;

    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    useEffect(() => {
        if (endDate) {
            setNumberOfDays(
                1 + Math.round(Math.abs((startDate - endDate) / oneDay))
            );
        }
    }, [endDate]);

    return (
        <>
            Number of days: {numberOfDays}
            <div className={styles.barContainer}>
                <DatePicker
                    // TODO zbugowany styling
                    wrapperClassName={styles.myWrapper}
                    dateFormat="dd/MM/yyyy"
                    selected={startDate}
                    onChange={onChange}
                    minDate={today}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                />
            </div>
        </>
    );
};
