import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './TypeList.css'
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div className='container'>
      <ul className="types-list-style row">
        {types.map((type, index) => (
          <li key={index} className='type col-4' style={{ textAlign: 'center' }}>
            <Link to={`/types/${type.id}/show_products`}>
              <img src={type.image.url} alt={type.name || "Type Image"}/>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TypeList;
