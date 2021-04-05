import React from 'react';
import { useState } from 'react';

const ToiletPhoto = ({ url, area }) => {
  const [hasError, setHasError] = useState(false);
  return (
    <div>
      {hasError ? (
        <a href={url} className="toilet-image-anchor">
          Image of {area}
        </a>
      ) : (
        <img
          src={url}
          className="toilet-photo"
          alt="Toilet Image"
          onError={() => {
            setHasError(true);
          }}
        />
      )}
    </div>
  );
};

export default ToiletPhoto;
