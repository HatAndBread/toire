import React from 'react';
import { useState, useEffect } from 'react';

import star from '../../../../assets/images/star.png';
import starTrans from '../../../../assets/images/star-trans.png';
import '../../../../assets/stylesheets/components/stars.css';

const IndividualStar = ({ filled, onClick }) => {
  if (filled) {
    return (
      <div className="individual-star" style={{ color: 'yellow', fontSize: '22px' }} onClick={onClick}>
        <img src={star} alt="★" />
      </div>
    );
  } else {
    return (
      <div className="individual-star" style={{ color: 'gray', fontSize: '22px' }} onClick={onClick}>
        <img src={starTrans} alt="★" />
      </div>
    );
  }
};

const Stars = ({ onChange, name }) => {
  const [filledStars, setFilledStars] = useState(0);
  useEffect(() => {
    filledStars && onChange({ target: { value: filledStars, name } });
  }, [filledStars]);
  const four = [1, 2, 3, 4];
  return (
    <div className="stars-container">
      {four.map((el) =>
        el <= filledStars ? (
          <IndividualStar
            key={el}
            filled={true}
            onClick={() => {
              setFilledStars(el);
            }}
          />
        ) : (
          <IndividualStar
            key={el}
            filled={false}
            onClick={() => {
              setFilledStars(el);
            }}
          />
        )
      )}
    </div>
  );
};

export default Stars;
