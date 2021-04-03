import React from 'react';

const ToiletPhoto = ({ url }) => {
  return (
    <div>
      <img src={url} alt={'Photo of a toilet'} width="250px" />
    </div>
  );
};

export default ToiletPhoto;
