import React from 'react';
import Modal from './modal';
import NewToilet from './newToilet';
import GeoLocationError from './geoLocationError';

const getModal = (openModal) => {
  if (!openModal) return;
  if (openModal === 'new-toilet') return <Modal content={<NewToilet />} title={'New Toilet'} />;
  if (openModal === 'geo-location-error') return <Modal content={<GeoLocationError />} title={'⚠️Error⚠️'} />;
};
export default getModal;
