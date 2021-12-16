import React, { useState, useEffect } from 'react';

import { Header } from '@components/Header/Header';
import { RentedItemList } from '@components/RentedItemList/RentedItemList';

import styles from './RentedView.module.scss';

// GET /????
const mockVehiclesResponse = {
    vehiclesCount: 2,
    vehicles: [
        {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa5',
            brandName: 'Abarth',
            modelName: 'Punto',
            year: 1999,
            enginePower: 696,
            enginePowerType: 'string',
            capacity: 42,
            description:
                'Dlugi opis hagikawoghawouighjaiguahgiuahgaiughaiughagiuahgaiughawiughaiguahgiauhg',
        },
        {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            brandName: 'Ford',
            modelName: 'Focus',
            year: 1969,
            enginePower: 420,
            enginePowerType: 'string',
            capacity: 69,
            description: 'string',
        },
    ],
};

export const RentedView = (props) => {
    const [rentInfo, setRentInfo] = useState([]);

    const fetchVehicles = () => {
        fetch('http://localhost:8010/proxy/rentedvehicles')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setRentInfo(data);
            });
    }

    useEffect(() => {
        fetchVehicles();
        //setVehicles(mockVehiclesResponse['vehicles']);
    }, []);

    return (
        <>
            <Header />
            <div className={styles.container}>
                <RentedItemList
                    rentInfo={rentInfo}
                />
            </div>
        </>
    );
};
