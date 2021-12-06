import React, {useState, useEffect} from 'react';

import { FaBeer } from 'react-icons/fa';
import { Header } from '@components/Header/Header';
import { ListItem } from '@components/ListItem/ListItem';

import styles from './MainView.module.scss';

import puntoImg from '@assets/640px-2000_Fiat_Punto_1.2_Front.jpg'

export const MainView = (props) => {
  // Create the count state.
  const [count, setCount] = useState(0);
  // Update the count (+1 every second).
  useEffect(() => {
    const timer = setTimeout(() => setCount(count + 1), 1000);
    return () => clearTimeout(timer);
  }, [count, setCount]);
  // Return the App component.
  return (
    <>
      <Header/>
      <ListItem imageUrl={puntoImg}/>
      <div className={styles.container}>
        {props.testString} otwarta przez <code>{count}</code> sekund <FaBeer />.
      </div>
    </>
  );
};
