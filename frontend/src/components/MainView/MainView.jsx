import React, { useState, useEffect } from 'react';

import { Header } from '../Header/Header';
import { ItemList } from '../ItemList/ItemList';
import { SearchBar } from '../SearchBar/SearchBar';

import styles from './MainView.module.scss';

// CUSTOM
const mockPossibleRentals = {
    rentalsCount: 4,
    rentals: [
        {
            "id": "1",
            "name": "Our Rental",
            "baseApiUrl": `${process.env.REACT_APP_API_URL}`
        },
        {
            "id": "2",
            "name": "Teacher Rental",
            "baseApiUrl": "https://mini.rentcar.api.snet.com.pl"
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
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/vehicles`
            );
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
