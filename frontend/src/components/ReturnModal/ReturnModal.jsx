import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import styles from './ReturnModal.module.scss';
import "react-datepicker/dist/react-datepicker.css";
//import "./DatePickerStyles.css"

// jest mergowany z domyslnym
const modalStyling = {
    content: {
        top: '15%',
        left: '15%',
        right: '15%',
        bottom: '15%',
    }
}

export const ReturnModal = ({ isOpen, onRequestClose }) => {
    const [description, setDescription] = useState(null);
    const [odometerValue, setOdometerValue] = useState(null);

    const handleConfirm = () => {
        if (description && odometerValue) {
            // TODO Tutaj call do api
            //handleSubmission()
            console.log(description, odometerValue);            
            // zamykamy okno
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
        setSelectedFiles([...selectedFiles, event.target.files[0]]);
		setIsFilePicked(true);
	};

	const handleSubmission = () => {
        // const formData = new FormData();

        // formData.append('File', selectedFile);

        // fetch('https://freeimage.host/api/1/upload?key=<YOUR_API_KEY>', {
        //     method: 'POST',
        //     body: formData,
        // })
        //     .then((response) => response.json())
        //     .then((result) => {
        //         console.log('Success:', result);
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });
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
                <div className={styles.header}>Rent details</div>

                <div className={styles.body}>
                    <DescriptionInput setDescription={setDescription} />
                    <OdometerInput setOdometerValue={setOdometerValue} />
                    <div className={styles.filePicker}>
                        <input
                            type="file"
                            name="file"
                            onChange={changeHandler}
                        />

                        {isFilePicked ? (
                            selectedFiles.map((f) => {
                                return (
                                    <div>
                                        <p>Filename: {f.name}</p>
                                        <p>Size in bytes: {f.size}</p>
                                    </div>
                                );
                            })
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
