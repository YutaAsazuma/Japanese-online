import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import axios from 'axios';

const ProductList = () => {
  let { id } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`/api/v1/types/${id}/show_products`, {
      headers: {
        'access-token': localStorage.getItem('access-token'),
        'client': localStorage.getItem('client'),
        'uid': localStorage.getItem('uid')
      }
    })
    .then(resp => {
      setProducts(resp.data);
    })
    .catch(error => {
      console.log("Error fetching products:", error);
    });
  }, [id])

  return (
    <ul>
      {products.length > 0 ? (
        products.map((product) => (
          <li key={product.id}>
            {product.images.length > 0 ? (
              product.images.map((image, index) => (
                <img key={index} src={image.url} alt={product.name} />
              ))
            ) : (
              <p>No images</p>
            )}
            <p>{product.name}</p>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <p>{product.amount_of_stocks}</p>
          </li>
        ))
      ) : (
        <p>No items found</p>
      )}
    </ul>
  );
};

export default ProductList;
