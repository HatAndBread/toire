import React from 'react';

interface Props {
  username: string;
}

const Nav: React.FC<Props> = ({ username }) => {
  return (
    <div>
      <div className="">Hello, {username}</div>
    </div>
  );
};
export default Nav;
