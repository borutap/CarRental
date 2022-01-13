import React, { useEffect, useState, useRef } from 'react';

import { HistoryItem } from '../HistoryItem/HistoryItem';
import puntoImg from '@assets/640px-2000_Fiat_Punto_1.2_Front.jpg';
import styles from './HistoryItemList.module.scss';

export const HistoryItemList = ({ rentInfo, attachments, blobClient }) => {

    // sortowanie po starcie wypozyczenia
    rentInfo.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

    return (
        <div className={styles.container}>
            {rentInfo.map((v) => {
                return (
                    <HistoryItem
                        key={v.rentId}
                        rentId={v.rentId}
                        imageUrl={puntoImg}
                        year={v.year}
                        power={v.enginePower}
                        capacity={v.capacity}
                        description={v.description}
                        brand={v.brand}
                        model={v.model}
                        rentStart={v.startDate}
                        rentEnd={v.endDate}
                        returnTime={v.returnTime}
                        attachments={attachments}
                        blobClient={blobClient}
                    />
                );            
            })}
        </div>
    );
};