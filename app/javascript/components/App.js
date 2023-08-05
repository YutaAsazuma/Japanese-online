import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import styled from 'styled-components';
import axios from "axios"
import TypeList from "./TypeList";
import ProductList from "./ProductsList";

function HomePage() {
  return (
    <div>
      <h1>Products explanation</h1>
      <Link to="/types">Our Products</Link>
    </div>
  );
}

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/types" element={<TypeList />} />
        <Route path="/types/:id/show_products" element={<ProductList />}/>
      </Routes>
    </div>
  )
}



export default App;
