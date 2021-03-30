import React from 'react';
import { useContext } from 'react';
import { Context } from '../../pages/home';

const Nav = ({ username }) => {
  const context = useContext(Context);
  const newToiletClick = () => context.setOpenModal('new-toilet');

  return (
    <div>
      <div className="">Hello, {username}</div>
      <a href="/users/sign_up">Sign up</a>
      <a href="/users/sign_in">Sign in</a>
      <a rel="nofollow" data-method="delete" href="/users/sign_out">
        Logout
      </a>
      <button onClick={newToiletClick}>New Toilet</button>
    </div>
  );
};

export default Nav;
