import React from 'react';
import { useContext } from 'react';
import { Context } from '../../pages/home';
import RailsForm from './railsForm';
import '../../../../assets/stylesheets/components/toiletReviewForm.css';

const ToiletReviewForm = () => {
  const myId = useContext(Context).currentToilet.id;
  console.log('HEY HNEY HEY', myId);
  const formContent = [
    { inputType: 'textarea', autoFocus: true, name: 'review-text-content', id: 'review-text-content' },
    { inputType: 'stars', name: 'cleanliness', id: 'cleanliness', label: 'cleanliness' }
  ];
  return (
    <div>
      <RailsForm
        requestType={'POST'}
        requestUrl={'/'}
        formContent={formContent}
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
