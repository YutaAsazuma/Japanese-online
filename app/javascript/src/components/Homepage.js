import React from 'react'
import BackgroundVideo from "./BackgroundVideo";
import Nav from "./Nav"
import './Homepage.css'
import TypeList from './TypeList';
import Scrolling from './Scrolling';

const Homepage = () => {
  const scrollTop = Scrolling();

  let topPosition = 100;

  if (scrollTop <= 40) {
    topPosition -= scrollTop;
  } else {
    topPosition = 40;
  }

  let opacityValue = 1 - (scrollTop / 500);
  if (opacityValue < 0.8) opacityValue = 0.8;
  if (opacityValue > 1) opacityValue = 1;

  return (
    <main>
      <div className="content">
        <BackgroundVideo style={{ opacity: opacityValue }}/>
        <div className="content-overlayed">
          <Nav />
          <h1></h1>
        </div>
      </div>
      <div className="type-list-overlay" style={{ top: `${topPosition}vh` }}>
        <TypeList />
      </div>
    </main>
  );
}

export default Homepage;
