import React from 'react';
import ReactDOM from 'react-dom';
import { createContext, useState, useEffect } from 'react';
import getModal from '../components/modal/getModal';
import Map from '../components/map/map';

export const Context = createContext({});
function Home() {
  const [openModal, setOpenModal] = useState(null);
  const [userLatitude, setUserLatitude] = useState(null);
  const [userLongitude, setUserLongitude] = useState(null);
  const [localToilets, setLocalToilets] = useState(null);
  const [toiletMarkers, setToiletMarkers] = useState([]);
  const [currentToilet, setCurrentToilet] = useState(null);
  const [isUsingMobile, setIsUsingMobile] = useState(false);

  useEffect(() => {
    const isMobile = (width, height) => {
      if ((width < 600 && height < 1000) || (width < 1000 && height < 600)) return true;
    };
    if (isMobile(window.innerWidth, window.innerHeight)) setIsUsingMobile(true);
    const onResize = () => {
      if (isMobile(window.innerWidth, window.innerHeight)) {
        setIsUsingMobile(true);
      } else {
        setIsUsingMobile(false);
      }
    };
    window.addEventListener('resize', onResize);
  }, [setIsUsingMobile]);

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
    setCurrentToilet,
    isUsingMobile
  };

  return (
    <Context.Provider value={context}>
      {getModal(openModal, context)}
      <Map />
    </Context.Provider>
  );
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Home />, document.body.appendChild(document.createElement('div')));
});
