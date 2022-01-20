import React, { useEffect } from 'react';

import { RentedItem } from '../RentedItem/RentedItem';
import puntoImg from '../../assets/640px-2000_Fiat_Punto_1.2_Front.jpg';
import styles from './RentedItemList.module.scss';

export const RentedItemList = ({ rentInfo }) => {
    return (
        <div className={styles.container}>
            {rentInfo.map((v) => {
                return (
                    <RentedItem
                        key={v.rentId}
                        rentId={v.rentId}
                        imageUrl={puntoImg}
                        year={v.year}
                        power={v.enginePower}
                        capacity={v.capacity}
                        description={v.description}
                        brandName={v.brandName}
                        modelName={v.modelName}
                        rentStart={v.startDate}
                        rentEnd={v.endDate}
                    />
                );              
            })}
        </div>
    );
};
