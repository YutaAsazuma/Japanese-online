import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import { styled } from 'styled-components';

axios.defaults.withCredentials = true;

function TypeList() {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    axios.get('/api/v1/types.json', { withCredentials: true })
      .then((resp) => {
        // console.log(resp.data);
        setTypes(resp.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <div>
      <h1>Discover items</h1>
      <ul>
        {types.map((type, index) => (
          <li key={index}>
            <Link to={`/types/${type.id}/show_products`}>{type.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TypeList;
