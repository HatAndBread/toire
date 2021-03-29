import React from 'react';
import ReactDOM from 'react-dom';
import token from './token.js';
import { createContext, useContext } from 'react';

import Nav from '../components/nav/nav';
import Map from '../components/map/map';
import Modal from '../components/modal/modal';

const myToken = token();

const Context = createContext({});
function Home() {
  const context = useContext(Context);
  return (
    <Context.Provider value={{ token: myToken }}>
      <Modal />
      <Nav username={'guest'} />
      <Map token={myToken} />
    </Context.Provider>
  );
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Home />, document.body.appendChild(document.createElement('div')));
});
