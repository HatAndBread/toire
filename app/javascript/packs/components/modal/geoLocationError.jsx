import React from 'react';

const GeoLocationError = () => {
  return (
    <div>
      <p>Your browser or device has blocked us from using your GPS coordinates. </p>
      <p>Please change your device settings to continue.</p>
    </div>
  );
};

export default GeoLocationError;
