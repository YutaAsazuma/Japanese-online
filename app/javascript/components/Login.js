import React, { useContext, useState } from "react";
import axios from "axios";
import UserContext from "./UserContext";
import { useNavigate } from "react-router-dom"

const Login = () => {
  const { setIsAdmin, handleLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ errorMessage, setErrorMessage ] = useState();

  axios.defaults.headers.common['X-CSRF-Token'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

  const submitLogin = (event) => {
    event.preventDefault();
    const userData = { email: email, password: password };
    axios.post('/auth/sign_in', userData, {
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log(response.data);
      const receivedData = response.data.data;
      const accessToken = response.headers['access-token'];
      const client = response.headers['client'];
      const uid = response.headers['uid'];

      localStorage.setItem('access-token', accessToken);
      localStorage.setItem('client', client);
      localStorage.setItem('uid', uid);

      handleLogin({
        user: receivedData,
        admin: receivedData.admin ? true : false
      });
      navigate('/')
    })
    .catch(error => {
      const errorMsg = error.response && error.response.data ? error.response.data.message : "Authentication error";
      setErrorMessage(errorMsg);
    });
  }

  return (
    <div className="login-wrapper">
      <h1>Log in</h1>
      {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
      <form onSubmit={submitLogin}>
        <label>
          <p>Email</p>
          <input type="text" onChange={e => setEmail(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Log in</button>
        </div>
      </form>
    </div>
  )
}

export default Login;