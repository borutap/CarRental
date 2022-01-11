import React, { useState, useEffect } from 'react';

import { Header } from '@components/Header/Header';
import { HistoryItemList } from '@components/HistoryItemList/HistoryItemList';
import styles from './HistoryView.module.scss';


// GET /vehicles
const mockVehiclesResponse = {
    vehiclesCount: 3,
    vehicles: [
        {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa5',
            brand: 'Fiat',
            model: 'Punto',
            year: 1999,
            enginePower: 696,
            enginePowerType: 'string',
            capacity: 42,
            description:
                'asdsadaszxczczxc',
            endDate: '12/24/2021',
            startDate: '12/12/2021',   
        },
        {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            brand: 'Mercedes',
            model: 'Hamiltona',
            year: 1969,
            enginePower: 420,
            enginePowerType: 'string',
            capacity: 69,
            description: 'Szybki bardzo bardzo szybki',
            endDate: '10/12/2021',
            startDate: '10/12/2021',  
        },
        {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa7',
            brand: 'Citroen',
            model: 'Wolny',
            year: 2069,
            enginePower: 0,
            enginePowerType: 'string',
            capacity: 0,
            description: 'string',
            endDate: '11/20/2021',
            startDate: '11/14/2021',  
        },
    ],
};

export const HistoryView = (props) => {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        setVehicles(mockVehiclesResponse['vehicles']);
    }, []);

    return (
        <>
            <Header />
            <div className={styles.container}>
                <HistoryItemList vehicles={vehicles} />
            </div>
        </>
    );
};
