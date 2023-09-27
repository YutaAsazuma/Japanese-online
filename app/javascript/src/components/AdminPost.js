import React, { useState, useEffect, useContext } from "react";
import API from "../api";
import UserContext from "../UserContext";

const AdminPost = () => {
  const { auth } = useContext(UserContext);
  const [ name, setName ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ price, setPrice ] = useState('');
  const [ amountOfStocks, setAmountOfStocks ] = useState('');
  const [ images, setImages ] = useState([]);
  const [ typeId, setTypeId] = useState('');
  const [ types, setTypes ] = useState([]);
  console.log('Auth Token:', auth?.token);

  useEffect(() => {
    if(auth?.token) {
      setAuthToken(auth.token);
    }
    const fetchTypes = async () => {
      try {
        const res = await API.get('/api/v1/types');
        setTypes(res.data);
      } catch (error) {
        console.error("Error fetching types:", error);
      }
    }
    fetchTypes();
  }, [auth]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!typeId) {
      console.error("Please select a type for the product.");
      return;
    }
    const formData = new FormData();
    formData.append('type_id', typeId);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('amount_of_stocks', amountOfStocks);
    images.forEach(image => formData.append('images[]', image));

    try {
      const headers = {
        'Content-Type': 'multipart/form-data',
      };

      const resp = await API.post('/api/v1/products', formData, {
        headers: headers,
      });

      if (response.status === 200 || response.status === 201) {
        console.log("Product created successfully:", response.data);
      } else {
        throw new Error("Failed to create product");
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        console.error("Errors from the server:", error.response.data.errors);
      } else {
        console.error("Request error:", error.message);
      }
    }

  }
  return (
    <div>
      <h1>Create New Product</h1>
      <form onSubmit={handleSubmit}>
        <select value={typeId} onChange={e => setTypeId(e.target.value)}>
          <option value="">Select a Type</option>
          {types.map(type => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount of stocks"
          value={amountOfStocks}
          onChange={e => setAmountOfStocks(e.target.value)}
        />
        <input
          type="file"
          multiple
          onChange={e => setImages([...e.target.files])}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default AdminPost;
