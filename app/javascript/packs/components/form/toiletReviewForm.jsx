import React from 'react';
import { useContext } from 'react';
import { Context } from '../../pages/home';
import RailsForm from './railsForm';
import '../../../../assets/stylesheets/components/toiletReviewForm.css';

const ToiletReviewForm = () => {
  const myId = useContext(Context).currentToilet.id;
  console.log('HEY HEY HEY', myId);
  const formContent = [
    { inputType: 'textarea', autoFocus: true, name: 'content', id: 'content' },
    { inputType: 'stars', name: 'cleanliness_score', id: 'cleanliness_score', label: 'cleanliness' }
  ];
  return (
    <div>
      <RailsForm
        requestType={'POST'}
        requestUrl={`/reviews`}
        formContent={formContent}
        additionalParams={{ toilet: myId }}
        onSubmit={(result) => {
          console.log(result);
        }}
        onError={(error) => {
          console.log(error);
        }}
      />
    </div>
  );
};

export default ToiletReviewForm;
