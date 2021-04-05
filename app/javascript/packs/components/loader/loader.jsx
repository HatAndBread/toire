import React from 'react';
import toilet from '../../../../assets/images/toilet32.png';
import '../../../../assets/stylesheets/components/loader.css';

const Loader = ({ hidden }) => {
  return (
    <div className="loader-container" hidden={hidden}>
      <div className="loader">
        <img src={toilet}></img>Searching for toilets...<img src={toilet}></img>
      </div>
    </div>
  );
};

export default Loader;
