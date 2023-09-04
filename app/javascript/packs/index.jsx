// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

library.add(fab, faHeart);

import React from 'react'
import ReactDOM  from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from '../src/App.js'
// import { createRoot } from 'react-dom/client'


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
