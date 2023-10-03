import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '../src/App';

library.add(fab, faHeart);

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#root');
  ReactDOM.createRoot(root).render(
    <BrowserRouter>
      <App/>
    </BrowserRouter>,
  );
});

// document.addEventListener('DOMContentLoaded', () => {
//   const root = document.body.appendChild(document.createElement('div'));
//   createRoot(root).render(<App />);
// })

// // Support component names relative to this directory:
// var componentRequireContext = require.context("../components", true);
// var ReactRailsUJS = require("react_ujs");
// ReactRailsUJS.useContext(componentRequireContext);
