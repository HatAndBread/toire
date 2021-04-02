import React from 'react';
import Modal from './modal';
import NewToilet from './newToilet';
import GeoLocationError from './geoLocationError';
import ToiletInfo from './toiletInfo';

const getModal = (openModal, context) => {
  if (!openModal) return;
  if (openModal === 'new-toilet') return <Modal content={<NewToilet />} title={'New Toilet'} />;
  if (openModal === 'geo-location-error') return <Modal content={<GeoLocationError />} title={'⚠️Error⚠️'} />;
  if (openModal === 'toilet-info')
    return (
      <Modal
        content={<ToiletInfo />}
        title={'Toilet'}
        onClose={() => {
          context.setCurrentToilet(null);
        }}
      />
    );
};
export default getModal;
