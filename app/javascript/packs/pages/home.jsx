import React from 'react';
import ReactDOM from 'react-dom';
import token from './token.js';
import { createContext, useState } from 'react';
import getModal from '../components/modal/getModal';

import Nav from '../components/nav/nav';
import Map from '../components/map/map';

const myToken = token();

export const Context = createContext({});
function Home() {
  const [openModal, setOpenModal] = useState(null);

  return (
    <Context.Provider value={{ token: myToken, setOpenModal }}>
      {getModal(openModal)}
      <Nav username={'guest'} />
      <Map token={myToken} />
    </Context.Provider>
  );
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Home />, document.body.appendChild(document.createElement('div')));
});
