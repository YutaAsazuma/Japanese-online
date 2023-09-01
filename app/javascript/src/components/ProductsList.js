import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import axios from 'axios';
import styled from 'styled-components';
import FavoriteButton from "./FavoriteButton";

axios.defaults.withCredentials = true;

const ProductGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
`;

const ProductCard = styled.div`
  position: relative;
  border: 1px solid #e1e1e1;
  background-color: white;
  padding: 13px;
  margin: 15px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 330px;
  flex: 1 1 calc(50% - 2rem);
  height: auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    flex: 1 1 calc(33.33% - 2rem);
  }

  @media (min-width: 1024px) {
    flex: 1 1 calc(25% - 2rem);
  }
`;

const ProductImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 5px;
`;

const ProductDetailFlex = styled.div`
  display: flex;
  margin: revert;
`;

const ProductPrice = styled.p`
  position: absolute;
  font-weight: bold;
  color: black;
  bottom: -13px;
  right: 12px;
`;
const ProductList = () => {
  let { id } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`/api/v1/types/${id}/show_products`, { withCredentials: true })
    .then(resp => {
      setProducts(resp.data);
    })
    .catch(error => {
      console.log("Error fetching products:", error);
    });
  }, [id])

  return (
    <ProductGrid>
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product.id}>
            {product.images.length > 0 ? (
              product.images.map((image, index) => (
                <ProductImage key={index} src={image.url} alt={product.name} />
              ))
            ) : (
              <p>No images</p>
            )}
            <ProductDetailFlex>
              <FavoriteButton productId={product.id} isFavorited={product.is_favorited} />
              <ProductPrice>{product.price}€</ProductPrice>
            </ProductDetailFlex>
          </ProductCard>
        ))
      ) : (
        <p>No items found</p>
      )}
    </ProductGrid>
  );
};

export default ProductList;
