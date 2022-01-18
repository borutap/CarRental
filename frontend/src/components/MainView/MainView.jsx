import React, { useState, useEffect } from 'react';

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
            brand: 'Fiat',
            model: 'Punto',
            year: 1999,
            enginePower: 696,
            enginePowerType: 'string',
            capacity: 42,
            description:
                'Dlugi opis hagikawoghawouighjaiguahgiuahgaiughaiughagiuahgaiughawiughaiguahgiauhg',
        },
        {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            brand: 'Aiat',
            model: 'Szerszen',
            year: 1969,
            enginePower: 420,
            enginePowerType: 'string',
            capacity: 69,
            description: 'string',
        },
        {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa7',
            brand: 'Niemam',
            model: 'Pojecia',
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
            "id": "1",
            "name": "Our Rental",
            "baseApiUrl": "https://localhost:44329"
        },
        {
            "id": "2",
            "name": "Dluzszanazwa",
            "baseApiUrl": "Dluzszanazwa.com/api/"
        },
        {
            "id": "3",
            "name": "bardzodluganazwa",
            "baseApiUrl": "bardzodluganazwa.com/api/"
        },
        {
            "id": "4",
            "name": "Rental4",
            "baseApiUrl": "Rental.com/api/"
        }
    ]
}



export const MainView = ({ setRole }) => {
    const [vehicles, setVehicles] = useState([]);
    const [possibleRentals, setPossibleRentals] = useState([]);
    const [query, setQuery] = useState('');
    const [alphabetically, setAlphabetically] = useState(false);

    const fetchVehicles = async () => {
        try {
            const response = await fetch('https://localhost:44329/vehicles');
            const data = await response.json();
            setVehicles(data);
        } catch (e) {
            alert('Could not fetch vehicles: ' + e.message);
        }
    }

    useEffect(() => {
        //setVehicles(mockVehiclesResponse['vehicles']);
         // nie potrzebujemy rezultatu wiec nie trzeba await
        fetchVehicles();
        setPossibleRentals(mockPossibleRentals['rentals'])
    }, []);

    return (
        <>
            
                <Header setRole={setRole}/>
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
                            <label htmlFor="alphabetically">Alphabetically</label>
                        </div>
                    </div>
                </div>            
        </>
    );
};
