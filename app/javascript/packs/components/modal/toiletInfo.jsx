import React from 'react';
import { useContext } from 'react';
import { Context } from '../../pages/home';
const ToiletInfo = () => {
  const data = useContext(Context).currentToilet;
  return (
    <div className="toilet-info-container">
      <div className="address"></div>
      {data['facility_name'] && <div>Facility name: {data['facility_name']}</div>}
      {data['building_name'] && <div>Building name: {data['building_name']}</div>}
      <div>Baby changing station: {data['baby_ready'] ? 'Yes' : 'No'}</div>
      <div className="reviews">
        {data.reviews.forEach((review) => (
          <div>{review}</div>
        ))}
      </div>
    </div>
  );
};

export default ToiletInfo;
