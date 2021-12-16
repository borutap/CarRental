import React, { useEffect } from 'react';

import { RentedItem } from '../RentedItem/RentedItem';
import puntoImg from '@assets/640px-2000_Fiat_Punto_1.2_Front.jpg';
import styles from './RentedItemList.module.scss';

export const RentedItemList = ({ vehicles, rental }) => {
    return (
        <div className={styles.container}>
            {vehicles.map((v) => {
                return (
                    <RentedItem
                        key={v.id}
                        imageUrl={puntoImg}
                        year={v.year}
                        power={v.enginePower}
                        capacity={v.capacity}
                        description={v.description}
                        brand={v.brandName}
                        model={v.modelName}
                    />
                );              
            })}
        </div>
    );
};
