import React from 'react';
import { useState } from 'react';

const ToiletPhoto = ({ url, area }) => {
  const [hasError, setHasError] = useState(false);
  return hasError ? (
    <button
      onClick={() => {
        window.open(url);
      }}
    >
      Image of {area}
    </button>
  ) : (
    <img
      src={url}
      className="toilet-photo"
      alt="Toilet Image"
      onError={() => {
        setHasError(true);
      }}
    />
  );
};

export default ToiletPhoto;
