import React from 'react';

const ProductList = ({ products }) => {
  return (
    <ul>
      {products.length > 0 ? (
        products.map((product) => (
          <li key={product.id}>
            {product.images.length > 0 ? (
              product.images.map((image) => (
                <img key={image.id} src={image.url} alt={product.name} />
              ))
            ) : (
              <p>No images</p>
            )}
            <p>{product.name}</p>
            <p>{product.description}</p>
            <p>{product.price}</p>
          </li>
        ))
      ) : (
        <p>No items found</p>
      )}
    </ul>
  );
};

export default ProductList;
