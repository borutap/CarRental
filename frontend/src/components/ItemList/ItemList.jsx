import React, { useEffect } from 'react';

import { Item } from '../Item/Item';
import puntoImg from '../../assets/640px-2000_Fiat_Punto_1.2_Front.jpg';
import styles from './ItemList.module.scss';

export const ItemList = ({ vehicles, possibleRentals, query, alphabetically }) => {

    if (alphabetically) {
        vehicles.sort((a, b) => a.brandName.localeCompare(b.brandName))
    }
    
    return (
        <div className={styles.container}>
            {vehicles.map((v) => {
                const brandName = v.brandName.toLowerCase()
                const modelName = v.modelName.toLowerCase()
                query = query.toLowerCase()

                if(query === '' || brandName.includes(query) || modelName.includes(query)) {
                    return (
                        <Item
                            key={v.id}
                            id={v.id}
                            imageUrl={puntoImg}
                            year={v.year}
                            power={v.enginePower}
                            capacity={v.capacity}
                            description={v.description}
                            brandName={v.brandName}
                            modelName={v.modelName}
                            possibleRentals={possibleRentals}
                        />
                    );
                }                
            })}
        </div>
    );
};
