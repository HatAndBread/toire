import React from 'react';
import { useContext } from 'react';
import { Context } from '../../pages/home';
import makeRequest from '../form/makeRequest';

const Nav = ({ setLoaderHidden }) => {
  const context = useContext(Context);
  const findToilets = () => {
    let ok;
    if (navigator.geolocation) {
      setLoaderHidden(false);
      ok = 1;
      navigator.geolocation.getCurrentPosition((position, error) => {
        if (error) {
          setLoaderHidden(true);
          return context.setOpenModal('geo-location-error');
        }

        context.setUserLatitude(position.coords.latitude);
        context.setUserLongitude(position.coords.longitude);
        makeRequest(
          { latitude: position.coords.latitude, longitude: position.coords.longitude },
          '/toilets_near_me',
          'POST',
          (error) => {
            console.log(error);
            setLoaderHidden(true);
          },
          (data) => {
            console.log(data);
            context.setLocalToilets(data);
            setLoaderHidden(true);
          }
        );
      });
    }
    if (!ok) {
      context.setOpenModal('geo-location-error');
      setLoaderHidden(true);
    }
  };

  return (
    <button onClick={findToilets} className="near-me-button">
      Find Toilets Near Me
    </button>
  );
};

export default Nav;
