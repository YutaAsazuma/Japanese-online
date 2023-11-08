import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import styled from 'styled-components';
import axios from 'axios';

const StyledIcon = styled(FontAwesomeIcon)`
  position: absolute;
  bottom: 9px;
  left: 5px;
  color: ${props => props.favorited ? "#ff0000" : " "};
`

const FavoriteButton = ({ productId, favoriteId, isFavorited, token }) => {
  const [ favorited, setFavorited ] = useState(isFavorited);
  const [ userFavoritedId, setUserFavoritedId ] = useState(favoriteId);

  useEffect(() => {
    setFavorited(isFavorited);
  }, [isFavorited]);

  const toggleFavorited = () => {
    if(favorited && favoriteId !== null){
      axios.delete(`/api/v1/products/${productId}/favorites/${userFavoritedId}`)
      .then(resp => {
        setFavorited(false);
        setUserFavoritedId(null);
      })
      .catch(error => {
        console.log("Error removing favorites:", error);
      })
    } else {
      const userToken = token;
      axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;

      axios.post(`/api/v1/products/${productId}/favorites`, {})
      .then(resp => {
        console.log('Post Response:', resp);
        if (resp.data.success) {
          setFavorited(true);
          setUserFavoritedId(resp.data.favoriteId);
        } else {
          setFavorited(false);
        }
      })
      .catch(error => {
        console.log("Error adding to favorites:", error);
      });
    }
   };

   return (
    <StyledIcon
      icon={favorited ? solidHeart : regularHeart}
      size="lg"
      data-favorited={favorited ? 'true' : 'false'}
      onClick={toggleFavorited}
    />
   );
};

export default FavoriteButton;
