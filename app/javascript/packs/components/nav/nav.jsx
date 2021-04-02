import React from 'react';
import { useContext } from 'react';
import { Context } from '../../pages/home';
import makeRequest from '../form/makeRequest';

const Nav = ({ username }) => {
  const context = useContext(Context);
  const newToiletClick = () => context.setOpenModal('new-toilet');
  const findToilets = () => {
    let ok;
    if (navigator.geolocation) {
      ok = 1;
      navigator.geolocation.getCurrentPosition((position, error) => {
        if (error) {
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
          },
          (data) => {
            console.log(data);
            context.setLocalToilets(data);
          }
        );
      });
    }
    if (!ok) {
      context.setOpenModal('geo-location-error');
    }
  };

  return (
    <div>
      <div className="">Hello, {username}</div>
      <button onClick={newToiletClick}>New Toilet</button>
      <button onClick={findToilets}>Find Toilets Near Me</button>
    </div>
  );
};

export default Nav;
