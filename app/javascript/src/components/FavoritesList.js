import React, { useState, useEffect } from "react";
import axios from 'axios';

// axios.defaults.withCredentials = true;
// const token = document.querySelector('meta[name="csrf-token"]').content;
// axios.defaults.headers.common['X-CSRF-Token'] = token;

const FavoritesList = ({token}) => {
  const [ favorites, setFavorites ] = useState([]);

  useEffect(() => {
    const userToken = token;
    axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;

    const fetchData = async () => {
      try {
        const resp = await axios.get('/api/v1/favorites');
        const favs = resp.data;

        const productResponses = await Promise.all(
          favs.map(fav => axios.get(`/api/v1/products/${fav.product_id}`))
        );

        const mergedFavorites = favs.map((fav, idx) => {
          const product = productResponses[idx].data.product;
          return {
            ...fav,
            product,
          }
        });

        setFavorites(mergedFavorites);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div>
      <h2>My Favorites</h2>
      {favorites.map(favorite => (
        <li key={favorite.id}>
        {favorite?.product?.images?.map((img, idx) =>
          <img key={idx} src={img} alt={favorite.product.name} width="100" />
        )}
          <p>{favorite?.product?.name}</p>
          <p>{favorite?.product?.price}€</p>
          <button>Add to cart</button>
        </li>
      ))}
    </div>
  );
}


export default FavoritesList;
