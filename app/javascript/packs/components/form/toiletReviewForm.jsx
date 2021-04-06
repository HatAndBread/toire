import React from 'react';
import { useContext, useEffect, useRef } from 'react';
import { Context } from '../../pages/home';
import RailsForm from './railsForm';
import '../../../../assets/stylesheets/components/toiletReviewForm.css';

const ToiletReviewForm = ({ setShowReviewForm, setReviewSubmitted }) => {
  const context = useContext(Context);
  const myId = context.currentToilet.id;
  const bottomRef = useRef();
  const formContent = [
    { inputType: 'textarea', autoFocus: true, name: 'content', id: 'content' },
    { inputType: 'stars', name: 'cleanliness_score', id: 'cleanliness_score', label: 'cleanliness' }
  ];
  useEffect(() => {
    bottomRef.current.scrollIntoView();
    console.log(bottomRef.current);
  }, []);
  return (
    <div>
      <div ref={bottomRef} />
      <RailsForm
        requestType={'POST'}
        requestUrl={`/reviews`}
        formContent={formContent}
        additionalParams={{ toilet: myId }}
        onSubmit={(result) => {
          console.log(result);
          context.setCurrentToilet(result.toilet);
          setShowReviewForm(false);
          setReviewSubmitted(true);
        }}
        onError={(error) => {
          console.log(error);
        }}
      />
    </div>
  );
};

export default ToiletReviewForm;
