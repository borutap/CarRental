import React, { useState, useEffect } from 'react';

import { FaBeer } from 'react-icons/fa';
import { Header } from '@components/Header/Header';
import { HistoryItemList } from '@components/HistoryItemList/HistoryItemList';
import { SearchBar } from '../SearchBar/SearchBar';
import styles from './HistoryView.module.scss';


// GET /vehicles
const mockVehiclesResponse = {
    vehiclesCount: 3,
    vehicles: [
        {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa5',
            brandName: 'Żubrówka',
            modelName: 'Biała',
            year: 1999,
            enginePower: 696,
            enginePowerType: 'string',
            capacity: 42,
            description:
                'Pychotka pyszniutka mniam mniam',
            endDate: '12/24/2021',
            startDate: '12/12/2021',   
        },
        {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            brandName: 'Żołądkowa',
            modelName: 'Gorzka',
            year: 1969,
            enginePower: 420,
            enginePowerType: 'string',
            capacity: 69,
            description: 'string',
            endDate: '10/12/2021',
            startDate: '10/12/2021',  
        },
        {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa7',
            brandName: 'Kuflowe',
            modelName: 'Mocne',
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

// POST /vehicle/{id}/GetPrice response
const mockPricesResponse = {
  "price": 1000,
  "currency": "zł",
  // "currency": "string",
  "generatedAt": "2021-12-07T19:20:37.759Z",
  "expiredAt": "2021-12-07T19:20:37.759Z",
  "quotaId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
};

export const HistoryView = (props) => {
    const [vehicles, setVehicles] = useState([]);
    const [prices, setPrices] = useState(null);
    const [query, setQuery] = useState('');

    useEffect(() => {
        setVehicles(mockVehiclesResponse['vehicles']);
        setPrices(mockPricesResponse['price'])
    }, []);

    return (
        <>
            <Header />
            <div className={styles.container}>
                <HistoryItemList query={query} vehicles={vehicles} />
            </div>
        </>
    );
};
