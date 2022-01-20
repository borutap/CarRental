import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { uploadFilesToBlob } from '@lib/AzureBlob';
import.meta.hot;
import styles from './ReturnModal.module.scss';

// jest mergowany z domyslnym
const modalStyling = {
    content: {
        top: '15%',
        left: '15%',
        right: '15%',
        bottom: '15%',
    }
}

export const ReturnModal = ({ rentId, setHidden, isOpen, onRequestClose }) => {
    const [description, setDescription] = useState(null);
    const [odometerValue, setOdometerValue] = useState(null);

    const returnRequest = async () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
            body: JSON.stringify({
                description: description,
                odometerValue: odometerValue,
            }),
        };
        const response = await fetch(
            `${
                __SNOWPACK_ENV__.MODE === 'development'
                    ? __SNOWPACK_ENV__.DEV_API_URL
                    : __SNOWPACK_ENV__.API_URL
            }/vehicle/Return/${rentId}`,
            requestOptions
        );

        if (response.status !== 200) {
            alert('Could not return the car, code: ' + response.status);
        } else {
            console.log('Returned the car');
            setHidden(true);
        }
    }

    const handleConfirm = () => {
        if (description && odometerValue) {
            // TODO Tutaj call do api
            
            uploadFilesToBlob(selectedFiles, rentId);
            returnRequest();
            // zamykamy okno
            onRequestClose();
        }
        if (!description && !odometerValue) {
            // TODO Lepszy error pokazac
            alert("Description and odometer value not set");
            return;
        }
        if (!description) {
            alert("Description not set");
        }
        if (!odometerValue) {
            alert("Odometer value not set");
        }              
    };

    const [selectedFiles, setSelectedFiles] = useState([]);
	const [isFilePicked, setIsFilePicked] = useState(false);

	const changeHandler = (event) => {       
        // max 2 pliki  
        const file = event.target.files[0];
        // to jest naiwne, tak naprawde na serwerze powinnismy sprawdzac
        // https://stackoverflow.com/a/29672957
        const extension = file.name.split('.').at(-1);
        const mimeFileType = file.type.split('/')[0];
        if (mimeFileType !== "image" && extension !== "pdf") {
            alert("Only images and pdfs allowed");
            return;
        }        
        if (file.size > 5*1024*1024) {
            alert("File size can't be greater than 5MB");
            return;
        }
        if (selectedFiles.length === 2) {
            setSelectedFiles([file]);
        }
        else {
            setSelectedFiles([...selectedFiles, file]);
        }
		setIsFilePicked(true);
	};

    return (
        <Modal
            ariaHideApp={false}
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="My dialog"
            style={modalStyling}
        >
            <div className={styles.container}>
                <div className={styles.header}>Return</div>

                <div className={styles.body}>
                    <DescriptionInput setDescription={setDescription} />
                    <OdometerInput setOdometerValue={setOdometerValue} />
                    <div className={styles.filePicker}>
                        <label htmlFor="file" className={styles.uploadButton}>
                            <input
                                type="file"
                                name="file"
                                onChange={changeHandler}
                            />
                        </label>
                        {isFilePicked ? (
                            <div className={styles.uploadedFilesContainer}>
                                {selectedFiles.map((f, index) => {
                                    return (
                                        <div key={index}>
                                            <p>Filename: {f.name}</p>
                                            <p>
                                                Size:{' '}
                                                {(f.size / 1024).toFixed(1)}KB
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p>Select a file to show details</p>
                        )}
                    </div>
                </div>

                <div className={styles.footer}>
                    <button onClick={onRequestClose}>Close modal</button>
                    <button onClick={handleConfirm}>Confirm</button>
                </div>
            </div>
        </Modal>
    );
};

const DescriptionInput = ({ setDescription }) => {
    return (
        <>
            Description
            <div className={styles.barContainer}>
                <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    className={styles.descriptionArea}                    
                />
            </div>
        </>
    );
};

const OdometerInput = ({ setOdometerValue }) => {
    return (
        <>
            Odometer value
            <div className={styles.barContainer}>
                <input
                    onChange={(e) => setOdometerValue(e.target.value)}
                    placeholder="Value"
                    className={styles.odometerInput}
                    type="number"
                    min="1"
                />
            </div>
        </>
    );
};
