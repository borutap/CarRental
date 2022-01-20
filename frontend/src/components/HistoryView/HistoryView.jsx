import React, { useState, useEffect, useContext } from 'react';

import { Header } from '../Header/Header';
import { HistoryItemList } from '../HistoryItemList/HistoryItemList';
import { UserContext } from '../../App'
import { getDownloadToken, getClient, getBlobsNamesInContainer } from '../../lib/AzureBlob';
import styles from './HistoryView.module.scss';

export const HistoryView = ({ setRole }) => {
    const [rentInfo, setRentInfo] = useState([]);
    const [attachments, setAttachments] = useState([]);
    const [blobClient, setBlobClient] = useState(null);

    const role = useContext(UserContext);

    const fetchVehicles = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/rentedhistory`,
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
            alert('Could not fetch historical vehicles: ' + e.message);
        }
    }

    const fetchAttachments = async () => {
        try {
            const downloadToken = await getDownloadToken();
            const client = getClient(downloadToken);
            setBlobClient(client);
            const blobNames = await getBlobsNamesInContainer(client);
            console.log("Fetched attachments' names");
            setAttachments(blobNames);
        } catch (e) {
            alert('Could not fetch attachments: ' + e.message);
        }
    }

    useEffect(() => {
        //console.log("useEffect w history");
        if (role === "guest") {
            return;
        }
        if (role === "client") {
            fetchAttachments();
        }      
        else if (role === "worker") {
            setAttachments([]);
        }
        fetchVehicles();
    }, [role]);

    return (
        <>
            <Header setRole={setRole} />
            <div className={styles.container}>
                {role !== 'guest' ? (
                    <HistoryItemList
                        rentInfo={rentInfo}
                        attachments={attachments}
                        blobClient={blobClient}
                    />
                ) : (
                    <p>You are unauthorized to view this page</p>
                )}
            </div>
        </>
    );
};
