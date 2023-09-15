import React from 'react'
import { Link } from 'react-router-dom'
import BackgroundVideo from "./BackgroundVideo";
import Nav from "./Nav"

const Homepage = () => {
  return (
    <>
      <BackgroundVideo />
        <h1>Products explanation</h1>
        <Link to="/types">Our Products</Link>
    </>
  );
}

export default Homepage;
