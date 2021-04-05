import React from 'react';
import ReactDOM from 'react-dom';
import { createContext, useState } from 'react';
import getModal from '../components/modal/getModal';

import Nav from '../components/nav/nav';
import Map from '../components/map/map';

export const Context = createContext({});
function Home() {
  const [openModal, setOpenModal] = useState(null);
  const [userLatitude, setUserLatitude] = useState(null);
  const [userLongitude, setUserLongitude] = useState(null);
  const [localToilets, setLocalToilets] = useState(null);
  const [toiletMarkers, setToiletMarkers] = useState([]);
  const [currentToilet, setCurrentToilet] = useState(null);

  const context = {
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
      <div className="main-container">
        <div className="hero">
          <h1 className="title">Tokyo Toilet Accessibility Map</h1>
          <p>
            Tokyo's only English language toilet review site! Click anywhere on the map to find the closest public
            toilets.
          </p>
          <Nav />
        </div>
        {getModal(openModal, context)}
        <Map />
      </div>
    </Context.Provider>
  );
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Home />, document.body.appendChild(document.createElement('div')));
});
