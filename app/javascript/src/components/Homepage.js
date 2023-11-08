import React from 'react'
import BackgroundVideo from "./BackgroundVideo";
import Nav from "./Nav"
import './Homepage.css'
import TypeList from './TypeList';
import ScrollingTop from './Scrolling';

const Homepage = () => {
  const scrollTop = ScrollingTop();

  let topPosition = 100;

  if (scrollTop <= 18) {
    topPosition -= scrollTop;
  } else {
    topPosition = 18;
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
        </div>
      </div>
      <div className="type-list-overlay" style={{ top: `${topPosition}vh` }}>
        <div style={{textAlign: "center", padding: "30px"}}>
          <h3>Find items</h3>
        </div>
        <TypeList />
      </div>
    </main>
  );
}

export default Homepage;
