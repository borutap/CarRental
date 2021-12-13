import React from 'react';
import Modal from 'react-modal';

export const RentModal = ({ isOpen, onRequestClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="My dialog"
        >
            <div>My modal dialog.</div>
            <button onClick={onRequestClose}>Close modal</button>
        </Modal>
    );
};
