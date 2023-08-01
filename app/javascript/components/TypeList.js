import React from 'react';
import { Link } from 'react-router-dom';

const TypeList = ({ types }) => {
  console.log(types)
  return (
    <div>
      {types.map((type) => (
        <div key={type.id}>
          <a href={`/types/${type.id}`}>{type.name}</a>
        </div>
      ))}
    </div>
  );
};

export default TypeList;
