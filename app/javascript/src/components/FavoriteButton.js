import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import styled from 'styled-components';
import axios from 'axios';

axios.defaults.withCredentials = true;

const StyledIcon = styled(FontAwesomeIcon)`
  position: absolute;
  bottom: 9px;
  left: 5px;
  color: ${props => props.favorited ? "#ff0000" : " "};
`

const FavoriteButton = ({ productId, favoriteId, isFavorited }) => {
  const [ favorited, setFavorited ] = useState(isFavorited);

  const toggleFavorited = () => {
    if (favorited) {
      axios.delete(`/api/v1/favorites/${favoriteId}`)
      .then(resp => {
        setFavorited(false)
      })
      .catch(error => {
        console.log("Error removing favorites:", error);
      })
    } else {
      axios.post(`/api/v1/products/${productId}/favorites`, {})
      .then(resp => {
        setFavorited(true);
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
      data-favorited={favorited.toString()}
      onClick={toggleFavorited}
    />
   );
};

export default FavoriteButton;
