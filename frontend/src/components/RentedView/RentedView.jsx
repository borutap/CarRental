import React, { useState, useEffect, useContext } from 'react';
import.meta.hot;
import { Header } from '@components/Header/Header';
import { RentedItemList } from '@components/RentedItemList/RentedItemList';
import { UserContext } from '../../app/App'
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

export const RentedView = ({setRole}) => {
    const [rentInfo, setRentInfo] = useState([]);

    const role = useContext(UserContext);

    const fetchVehicles = async () => {
        try {
            const response = await fetch(
                `${
                    __SNOWPACK_ENV__.MODE === 'development'
                        ? __SNOWPACK_ENV__.DEV_API_URL
                        : __SNOWPACK_ENV__.API_URL
                }/rentedvehicles`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'access_token'
                        )}`,
                    },
                }
            );
            const data = await response.json();
            setRentInfo(data);
        } catch (e) {
            alert('Could not fetch rented vehicles: ' + e.message);
        }
    }

    useEffect(() => {
        if (role === "guest") {
            return;
        }
        fetchVehicles();
        //setVehicles(mockVehiclesResponse['vehicles']);
    }, []);

    return (
        <>
            <Header setRole={setRole} />
            <div className={styles.container}>
                {role !== 'guest' ? (
                    <RentedItemList rentInfo={rentInfo} />
                ) : (
                    <p>You are unauthorized to view this page</p>
                )}
            </div>
        </>
    );
};
