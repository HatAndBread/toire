import React from 'react';
import RailsForm from '../form/railsForm';

const newToilet = () => {
  return (
    <div>
      <RailsForm
        requestType="POST"
        requestUrl="/toilets"
        formContent={[
          { inputType: 'number', name: 'cleanliness', id: 'cleanliness', label: 'Cleanliness ', autoFocus: true },
          { inputType: 'radio', name: 'password', id: 'password', label: 'Wheel chair accessible: ' }
        ]}
        onSubmit={() => {
          console.log('success!');
        }}
        onError={(error) => {
          alert(error);
        }}
      />
    </div>
  );
};
export default newToilet;
