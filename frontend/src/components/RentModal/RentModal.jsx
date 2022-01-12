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

export const RentModal = ({ vehicleId, pricePerDay, isOpen, onRequestClose }) => {
    const [numberOfDays, setNumberOfDays] = useState(null);
    const [location, setLocation] = useState(null);
    
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);

    const fetchQuoteId = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                age: 20,
                yearsOfHavingDriverLicense: 5,
                rentDuration: numberOfDays,
                location: location,
                currentlyRentedCount: 0,
                overallRentedCount: 0
            }),
        };
        const response = await fetch(
            `https://localhost:44329/vehicle/${vehicleId}`,
            requestOptions
        );

        if (!response.ok) {
            alert('Could not fetch quote ID: ' + e.message);
        }

        const quoteJson = await response.json();
        return quoteJson['quoteId'];
    }

    const rent = async () => {
        const quoteId = await fetchQuoteId();
        // const quote = quoteJson['quoteId']
        console.log("quoteId: " + quoteId);
        const rentId = await fetchRentId(quoteId);
        console.log("rentId: " + rentId);
    }

    const fetchRentId = async (quoteId) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                startDate: startDate,
                endDate: endDate
            }),
        };
        
        // TODO - api powinno zwracac inny kod
        try {
            const response = await fetch(
                `https://localhost:44329/vehicle/Rent/${quoteId}`,
                requestOptions
            );
            
            if (!response.ok) {
                alert('Could not fetch rent ID');
                return;
            }
    
            const rentJson = await response.json();
            return rentJson['rentId'];
        } catch(e) {
            alert('Car has already been rented: ' + e.message);
        }        
    }
    
    const handleConfirm = () => {
        if (numberOfDays && location) {
            console.log("input OK");
            console.log(startDate, endDate, pricePerDay * numberOfDays)
            rent();
            onRequestClose();
        }
        else {
            // TODO Lepszy error pokazac
            alert("Fields not set");
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
                    <LocationInput setLocation={setLocation}/>
                    <DaysInput
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
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

const LocationInput = ({ setLocation }) => {
    return (
        <>
            Location
            <div className={styles.barContainer}>
                <div className={styles.inputBar}>
                    <input
                        onChange={(e) => setLocation(e.target.value)}
                        type="text"
                        placeholder="Location"
                    />
                </div>
            </div>
        </>
    );
};

const DaysInput = ({
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    numberOfDays,
    setNumberOfDays,
}) => {
    const today = new Date();
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
