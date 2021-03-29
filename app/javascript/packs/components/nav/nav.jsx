import React from 'react';
import { useContext } from 'react';
import { Context } from '../../pages/home';

const Nav = ({ username }) => {
  const context = useContext(Context);
  const signUpClick = () => context.setOpenModal('sign-up');
  const loginClick = () => context.setOpenModal('login');
  const logoutClick = async () => {
    const res = await fetch('/users/sign_out', { method: 'DELETE' });
    console.log(res.json());
  };

  return (
    <div>
      <div className="">Hello, {username}</div>
      <button onClick={signUpClick}>Sign up</button>
      <button onClick={loginClick}>Log in</button>
      <a rel="nofollow" data-method="delete" href="/users/sign_out">
        Logout
      </a>
    </div>
  );
};
export default Nav;
