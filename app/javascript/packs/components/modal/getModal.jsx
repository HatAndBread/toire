import React from 'react';
import Modal from './modal';
import RailsForm from '../form/railsForm';

const getModal = (openModal) => {
  const newToilet = (
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

  if (!openModal) return;
  if (openModal === 'new-toilet') return <Modal content={newToilet} title={'New Toilet'} />;
};
export default getModal;
