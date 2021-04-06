import React from 'react';

const ToiletPhoto = ({ url, index }) => {
  return (
    <div className="button-holder">
      <button
        onClick={() => {
          window.open(url);
        }}
      >
        Image {index}
      </button>
    </div>
  );
};

export default ToiletPhoto;
