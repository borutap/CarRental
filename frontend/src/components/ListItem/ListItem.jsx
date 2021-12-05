import React, { useState } from 'react';
import { Button } from '@components/Button/Button'
import  classNames  from 'classnames';

import styles from './ListItem.module.scss'

export const ListItem = (props) => {
  const [expanded, setExpanded] = useState(false);

  const VehicleInfo = () => {
    return (
      <>
        <p>
          <b>Marka</b>: Fiat
        </p>
        <p>
          <b>Model</b>: Punto
        </p>
      </>
    );
  };

  const VehicleDetails = () => {
    return (
      <>
        <p>
          <b>Rok produkcji:</b>          
        </p>
        <p>
          <b>Moc:</b>
        </p>
        <p>
          <b>Pojemność:</b>          
        </p>
        <p>
          Samochód został zbudowany na płycie podłogowej dzielonej z Lancią Ypsilon oraz Fiatem Barchetta.
          Sylwetką nadwozia zaprojektował Giorgetto Giugiaro.
          W 1995 roku pojazd otrzymał tytuł Samochodu Roku.
          Wyprodukowano łącznie 3,429 miliona sztuk Punto I generacji.
        </p>
      </>
    );
  };

  return (
    // laczy styles.container ze styles.expaneded jezeli expanded true
    // <div className={classNames(styles.container, {[styles.expanded] : expanded})}>      
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <div className={styles.imgContainer}>
          <img src={props.imageUrl}/>
        </div>
        <div className={styles.name}>
          <VehicleInfo/>
        </div>
        <div className={styles.buttons}>
          <p className={styles.priceText}>1000zł</p>
          <div onClick={() => setExpanded(!expanded)}>
            <Button width={100} text="Car details"/>
          </div>
          <Button width={100} text="Rent"/>
        </div>
      </div>
      <div className={styles.fullText}>
        {expanded && <VehicleDetails/>}
      </div>
    </div>
  );
};