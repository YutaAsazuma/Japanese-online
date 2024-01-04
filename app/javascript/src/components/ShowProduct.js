import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';

axios.defaults.withCredentials = true;
const token = document.querySelector('meta[name="csrf-token"]').content;
axios.defaults.headers.common['X-CSRF-Token'] = token;

function ShowProduct({ user, token }) {
  let { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect (() => {
    const fetchProduct = async () => {
      try {
        if (user) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }

        const resp = await axios.get(`/api/v1/products/${productId}`, {
          withCredentials: true,
        });
        setProduct(resp.data);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };
    fetchProduct();
  }, [productId, user, token])
  return (
    <div>
      <p>{product.name}</p>
    </div>
  )
}

export default ShowProduct;
