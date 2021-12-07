import React from 'react';

import { Item } from '../Item/Item';
import puntoImg from '@assets/640px-2000_Fiat_Punto_1.2_Front.jpg';
import styles from './ItemList.module.scss';

export const ItemList = ({ vehicles, prices, query }) => {
    return (
        <div className={styles.container}>
            {vehicles.map((v) => {
                const brand = v.brandName.toLowerCase()
                const model = v.modelName.toLowerCase()
                query = query.toLowerCase()

                if(query === '' || brand.includes(query) || model.includes(query)) {
                    return (
                        <Item
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
                }                
            })}
        </div>
    );
};
