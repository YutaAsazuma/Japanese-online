import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from "../UserContext";
import BackgroundVideo from "./BackgroundVideo";
import styled, { css } from 'styled-components';
import Nav from "./Nav"
import './GrobalStyles.css'

const Homepage = () => {
  return (
    <>
      <BackgroundVideo />
      <div className="content-overlay">
        <Nav />
        <h1>Products explanation</h1>
        <Link to="/types">Our Products</Link>
      </div>
    </>
  );
}

export default Homepage;
