import React from 'react';
import { useContext } from 'react';
import { Context } from '../../pages/home';

const Nav = ({ username }) => {
  const context = useContext(Context);
  const newToiletClick = () => context.setOpenModal('new-toilet');

  return (
    <div>
      <div className="">Hello, {username}</div>
      <button onClick={newToiletClick}>New Toilet</button>
    </div>
  );
};

export default Nav;
