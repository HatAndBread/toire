import React from 'react';
import Modal from './modal';
import SignUp from './signup';
import LogIn from './login';

const getModal = (openModal) => {
  if (!openModal) return;
  if (openModal === 'sign-up') return <Modal content={SignUp} />;
  if (openModal === 'login') return <Modal content={LogIn} />;
};
export default getModal;
