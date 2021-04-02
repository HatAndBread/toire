import React from 'react';
import ReactDOM from 'react-dom';
import token from './token.js';
import { createContext, useState, useEffect } from 'react';
import getModal from '../components/modal/getModal';

import Nav from '../components/nav/nav';
import Map from '../components/map/map';

const myToken = token();

export const Context = createContext({});
function Home() {
  const [openModal, setOpenModal] = useState(null);
  const [userLatitude, setUserLatitude] = useState(null);
  const [userLongitude, setUserLongitude] = useState(null);
  const [localToilets, setLocalToilets] = useState(null);
  const [toiletMarkers, setToiletMarkers] = useState([]);
  const [currentToilet, setCurrentToilet] = useState(null);

  const context = {
    token: myToken,
    setOpenModal,
    userLatitude,
    setUserLatitude,
    userLongitude,
    setUserLongitude,
    localToilets,
    setLocalToilets,
    toiletMarkers,
    setToiletMarkers,
    currentToilet,
    setCurrentToilet
  };

  return (
    <Context.Provider value={context}>
      {getModal(openModal, context)}
      <Nav username={'guest'} />
      <Map token={myToken} />
    </Context.Provider>
  );
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Home />, document.body.appendChild(document.createElement('div')));
});
