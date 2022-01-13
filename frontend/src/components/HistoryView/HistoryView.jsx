import React, { useState, useEffect } from 'react';

import { Header } from '@components/Header/Header';
import { HistoryItemList } from '@components/HistoryItemList/HistoryItemList';
import { getClient, getBlobsNamesInContainer } from '@lib/AzureBlob';
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
    const [rentInfo, setRentInfo] = useState([]);
    const [attachments, setAttachments] = useState([]);
    const [blobClient, setBlobClient] = useState(null);

    const fetchVehicles = async () => {
        try {
            const response = await fetch('https://localhost:44329/rentedhistory');
            const data = await response.json();
            setRentInfo(data);
        } catch (e) {
            alert('Could not fetch historical vehicles: ' + e.message);
        }
    }

    const fetchAttachments = async () => {
        try {
            const client = getClient();
            setBlobClient(client);
            const blobNames = await getBlobsNamesInContainer(client);
            console.log("Fetched attachments' names");
            setAttachments(blobNames);
        } catch (e) {
            alert('Could not fetch attachments: ' + e.message);
        }
    }

    useEffect(() => {
        fetchAttachments();
        fetchVehicles();
    }, []);

    return (
        <>
            <Header />
            <div className={styles.container}>
                <HistoryItemList
                    rentInfo={rentInfo}
                    attachments={attachments}
                    blobClient={blobClient}
                />
            </div>
        </>
    );
};
