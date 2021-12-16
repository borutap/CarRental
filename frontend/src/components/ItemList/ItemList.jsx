import React, { useEffect } from 'react';

import { Item } from '../Item/Item';
import puntoImg from '@assets/640px-2000_Fiat_Punto_1.2_Front.jpg';
import styles from './ItemList.module.scss';

export const ItemList = ({ vehicles, possibleRentals, query, alphabetically }) => {

    if (alphabetically) {
        vehicles.sort((a, b) => a.brand.localeCompare(b.brand))
    }
    
    return (
        <div className={styles.container}>
            {vehicles.map((v) => {
                const brand = v.brand.toLowerCase()
                const model = v.model.toLowerCase()
                query = query.toLowerCase()

                if(query === '' || brand.includes(query) || model.includes(query)) {
                    return (
                        <Item
                            key={v.id}
                            id={v.id}
                            imageUrl={puntoImg}
                            year={v.year}
                            power={v.enginePower}
                            capacity={v.capacity}
                            description={v.description}
                            brand={v.brand}
                            model={v.model}
                            possibleRentals={possibleRentals}
                        />
                    );
                }                
            })}
        </div>
    );
};
