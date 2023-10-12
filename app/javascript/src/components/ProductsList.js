import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';
import FavoriteButton from "./FavoriteButton";
// import Slider from "react-slick";
import ImageSlider from "./ImageSlider";

axios.defaults.withCredentials = true;
const token = document.querySelector('meta[name="csrf-token"]').content;
axios.defaults.headers.common['X-CSRF-Token'] = token;

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

// const ProductImage = styled.img`
//   max-width: 100%;
//   height: auto;
//   border-radius: 5px;
// `;

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

const ProductList = ({ user, token }) => {
  let { id } = useParams();
  const [products, setProducts] = useState([]);

  const containerStyle = {
    width: "100%",
    height: "280px",
    margin: "0 auto"
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (user) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }

        const resp = await axios.get(`/api/v1/types/${id}/show_products`, {
          withCredentials: true,
        });

        console.log("API Response:", resp.data);

        const fetchedProducts = await Promise.all(
          resp.data.map(async (product) => {
            const favoriteResponse = user
              ? await axios.get(
                  `/api/v1/products/${product.id}/favorite`,
                  { withCredentials: true }
                )
              : { data: { isFavorited: false, favoriteId: null } };

            const isFavorited = favoriteResponse.data.isFavorited;
            const favoriteId = isFavorited
              ? favoriteResponse.data.favoriteId
              : null;

            const imageUrls =
              product.images.map( (image) => {
                // const imageUrlResponse = await fetchImageFromServer(image);
                // const imageUrl = imageUrlResponse.data.url;
                // console.log("Image URL:", imageUrl);
                // return imageUrl;
                return image.url;
              });
            console.log("Product:", product.name, "Image URLs:", imageUrls);
            return { ...product, isFavorited, favoriteId, imageUrls };
          })
        );

        setProducts(fetchedProducts);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [id, user, token]);

  return (
    <ProductGrid>
      {products.length > 0 ? (
        products.map((product) => {
          const favoriteId = product.is_favorited ? product.favorite_id : null;
          return (
            <ProductCard key={product.id}>
              <div style={containerStyle}>
                <ImageSlider imageUrls={product.imageUrls} cardHeight="300px" />
              </div>
              {/* <Slider {...sliderSettings}>
                {product.imageUrls && product.imageUrls.length > 0 ? (
                  product.imageUrls.map((imageUrl, index) => (
                    <div key={index}>
                      <ProductImage src={imageUrl} alt={product.name} />
                    </div>
                  ))
                ) : (
                  <p key="no-image">No images</p>
                )}
              </Slider> */}
              <ProductDetailFlex>
                <FavoriteButton
                  productId={product.id}
                  favoriteId={favoriteId}
                  isFavorited={product.is_favorited}
                  user={user}
                  token={token}
                />
                <ProductPrice>{product.price}€</ProductPrice>
              </ProductDetailFlex>
            </ProductCard>
          );
        })
      ) : (
        <p key="no-items">No items found</p>
      )}
    </ProductGrid>
  );
};

export default ProductList;
