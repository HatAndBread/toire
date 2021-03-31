import React from 'react';
import Modal from './modal';
import NewToilet from './newToilet';

const getModal = (openModal) => {
  if (!openModal) return;
  if (openModal === 'new-toilet') return <Modal content={<NewToilet />} title={'New Toilet'} />;
};
export default getModal;
