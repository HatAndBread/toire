import React from 'react';
import { useContext, useState } from 'react';
import { Context } from '../../pages/home';
import ToiletPhoto from './toiletPhoto';
import GoodIcon from '../../../../assets/images/good.png';
import BadIcon from '../../../../assets/images/bad.png';
import BothIcon from '../../../../assets/images/both.png';
import MenIcon from '../../../../assets/images/men.png';
import WomenIcon from '../../../../assets/images/women.png';
import StarIcon from '../../../../assets/images/star.png';
import TransparentStarIcon from '../../../../assets/images/star-trans.png';
import '../../../../assets/stylesheets/components/toiletInfo.css';

const ToiletInfo = () => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const data = useContext(Context).currentToilet;
  let averageStars = Math.round(
    data.reviews
      .map((review) => review['cleanliness_score'])
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0) / data.reviews.length
  );
  averageStars ? (averageStars = averageStars) : (averageStars = 0);
  const starImages = [...new Array(4)].map((el, index) => {
    if (index < averageStars) {
      return <img src={StarIcon} key={index}></img>;
    } else {
      return <img src={TransparentStarIcon} key={index}></img>;
    }
  });

  const stars = <div className="cleanliness-stars">Cleanliness: {starImages.map((img) => img)}</div>;
  return (
    <div className="toilet-info-container">
      {data.gender === 'both' && <img src={BothIcon} width="50px" />}
      {data.gender === 'men' && <img src={MenIcon} width="50px" />}
      {data.gender === 'women' && <img src={WomenIcon} width="50px" />}
      {data['facility_name'] && <div>Facility name: {data['facility_name']}</div>}
      {data['building_name'] && <div>Building name: {data['building_name']}</div>}
      <div>{stars}</div>
      <div>
        Baby changing station:{' '}
        {data['baby_ready'] ? <img src={GoodIcon} alt="Good" /> : <img src={BadIcon} alt="Bad" />}
      </div>
      <div>
        Wheel chair accessibility:{' '}
        {data['wheel_chair_accessible'] ? <img src={GoodIcon} alt="Good" /> : <img src={BadIcon} alt="Bad" />}
      </div>
      {data['photo_urls'].length && (
        <div className="toilet-photos">
          {data['photo_urls'].map((photo, index) => (
            <ToiletPhoto url={photo.url} area={photo.area} key={index} />
          ))}
        </div>
      )}
      <div className="reviews">
        <h2>Reviews</h2>
        <button>Write a review!</button>
        {data.reviews.map((review, index) => {
          const reviewDiv = (
            <div className="individual-review" key={index}>
              <p>{review.content}</p>
            </div>
          );
          if (showAllReviews) {
            return reviewDiv;
          }
          if (index < 1) return reviewDiv;
        })}
        {!showAllReviews && data.reviews.length > 1 && (
          <button onClick={() => setShowAllReviews(true)}>Show all reviews</button>
        )}
      </div>
    </div>
  );
};

export default ToiletInfo;
