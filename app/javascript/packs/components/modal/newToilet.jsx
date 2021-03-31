import React from 'react';
import RailsForm from '../form/railsForm';

const newToilet = () => {
  return (
    <div>
      <RailsForm
        requestType="POST"
        requestUrl="/toilets"
        formContent={[
          {
            inputType: 'number',
            name: 'cleanliness',
            id: 'cleanliness',
            label: 'Cleanliness ',
            autoFocus: true,
            min: 0,
            max: 4
          },
          {
            inputType: 'checkbox',
            name: 'wheel_chair_accessible',
            id: 'wheel_chair_accessible',
            label: 'Wheel chair accessible: '
          }
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
