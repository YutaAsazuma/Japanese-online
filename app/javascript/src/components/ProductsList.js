import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import FavoriteButton from "./FavoriteButton";
import ImageSlider from "./ImageSlider";
import Nav from "./Nav"
import AdjustPaddingBottom from "./AdjustPaddingBottom"
import './ProductList.css'
import 'bootstrap/dist/css/bootstrap.min.css';

axios.defaults.withCredentials = true;
const token = document.querySelector('meta[name="csrf-token"]').content;
axios.defaults.headers.common['X-CSRF-Token'] = token;

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

  useEffect(() => {
    AdjustPaddingBottom();
    window.addEventListener('resize', AdjustPaddingBottom);

    return () => {
      window.removeEventListener('resize', AdjustPaddingBottom);
    };
  },[products]);

  return (
    <div>
      <Nav style={{color: "white"}}/>
      <div style={{backgroundColor: "black"}}>
        <div className="container" style={{ margin: "0 auto", padding: "23px" }}>
          <div className="product-grid">
            {products.length > 0 ? (
              products.map((product, index) => {
                const favoriteId = product.is_favorited ? product.favorite_id : null;

                return (
                  <div className="product-item" key={product.id} style={{transform: index % 2 === 1 ? 'translateY(50%)' : 'null'}}>
                    <div className="product-card">
                      <div style={containerStyle}>
                        <ImageSlider imageUrls={product.imageUrls} cardHeight="300px" />
                      </div>
                      <div className="product-flex">
                        <FavoriteButton
                          productId={product.id}
                          favoriteId={favoriteId}
                          isFavorited={product.is_favorited}
                          user={user}
                          token={token}
                        />
                      </div>
                    </div>
                    <div className="product-description">
                      <h3>{product.description}</h3>
                      <h3>{product.price}€</h3>
                    </div>
                  </div>
                );
              })
            ) : (
              <p key="no-items">No items found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
