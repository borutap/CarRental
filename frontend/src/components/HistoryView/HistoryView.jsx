import React, { useState, useEffect } from 'react';

import { FaBeer } from 'react-icons/fa';
import { Header } from '@components/Header/Header';
import { ItemList } from '@components/ItemList/ItemList';
import { SearchBar } from '../SearchBar/SearchBar';

import styles from './HistoryView.module.scss';

// GET /vehicles
const mockVehiclesResponse = {
    vehiclesCount: 3,
    vehicles: [
        {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa5',
            brandName: 'Fiat',
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
            brandName: 'Gówno',
            modelName: 'Szerszen',
            year: 1969,
            enginePower: 420,
            enginePowerType: 'string',
            capacity: 69,
            description: 'string',
        },
        {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa7',
            brandName: 'Niemam',
            modelName: 'Pojecia',
            year: 2069,
            enginePower: 0,
            enginePowerType: 'string',
            capacity: 0,
            description: 'string',
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
                <ItemList query={query} vehicles={vehicles} />
                <SearchBar setQuery={setQuery} />
            </div>
        </>
    );
};
