import React from 'react';
import { useContext } from 'react';
import { Context } from '../../pages/home';
const ToiletInfo = () => {
  const data = useContext(Context).currentToilet;
  return (
    <div className="toilet-info-container">
      <div className="address"></div>
      <div className="reviews">{JSON.stringify(data)}</div>
    </div>
  );
};

export default ToiletInfo;
