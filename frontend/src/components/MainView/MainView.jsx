import React, { useState, useEffect } from 'react';

import { FaBeer } from 'react-icons/fa';
import { Header } from '@components/Header/Header';
import { ItemList } from '@components/ItemList/ItemList';
import { SearchBar } from '../SearchBar/SearchBar';

import styles from './MainView.module.scss';

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
            brandName: 'Aiat',
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

// CUSTOM
const mockPossibleRentals = {
    rentalsCount: 4,
    rentals: [
        {
            "id": "12345",
            "name": "Rental hgw",
            "apiBaseUrl": "rentalhgw.com/api/"
        },
        {
            "id": "21345",
            "name": "Dluzszanazwa",
            "apiBaseUrl": "Dluzszanazwa.com/api/"
        },
        {
            "id": "31245",
            "name": "bardzodluganazwa",
            "apiBaseUrl": "bardzodluganazwa.com/api/"
        },
        {
            "id": "23145",
            "name": "Rental4",
            "apiBaseUrl": "Rental.com/api/"
        }
    ]
}

export const MainView = (props) => {
    const [vehicles, setVehicles] = useState([]);
    const [possibleRentals, setPossibleRentals] = useState([]);
    const [query, setQuery] = useState('');
    const [alphabetically, setAlphabetically] = useState(false);

    useEffect(() => {
        setVehicles(mockVehiclesResponse['vehicles']);
        setPossibleRentals(mockPossibleRentals['rentals'])
    }, []);

    return (
        <>
            <Header />
            <div className={styles.container}>
                <ItemList
                    alphabetically={alphabetically}
                    query={query}
                    vehicles={vehicles}
                    possibleRentals={possibleRentals}
                />
                {/* TODO poprawic styl */}
                <div className={styles.rightContainer}>
                    <SearchBar setQuery={setQuery} />
                    <div>
                        <input
                            type="checkbox"
                            id="alphabetically"
                            onChange={() => setAlphabetically(!alphabetically)}
                        />
                        <label for="alphabetically">Alphabetically</label>
                    </div>
                </div>
            </div>
        </>
    );
};
