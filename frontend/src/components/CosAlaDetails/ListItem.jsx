import React from 'react';

import styles from './ListItem.module.css'

export const ListItem = (props) => {
  return (        
    <div className={styles.container}>
      <img src={props.imageUrl}/>
      <div className={styles.specs}>
        <p>
          <b>Marka:</b>          
        </p>
        <p>
          <b>Model:</b>          
        </p>
        <p>
          <b>Rok produkcji:</b>          
        </p>
        <p>
          <b>Moc:</b>
        </p>
        <p>
          <b>Rok produkcji:</b>          
        </p>
      </div>
      <div className={styles.description}>
        <p>
          Samochód został zbudowany na płycie podłogowej dzielonej z Lancią Ypsilon oraz Fiatem Barchetta.
          Sylwetką nadwozia zaprojektował Giorgetto Giugiaro.
          W 1995 roku pojazd otrzymał tytuł Samochodu Roku.
          Wyprodukowano łącznie 3,429 miliona sztuk Punto I generacji.
        </p>
      </div>
    </div>
  );
};