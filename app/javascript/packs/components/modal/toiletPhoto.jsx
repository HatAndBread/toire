import React from 'react';

const ToiletPhoto = ({ url }) => {
  return (
    <div>
      <img src={url} alt={'Photo of a toilet'} className="toilet-photo" />
    </div>
  );
};

export default ToiletPhoto;
