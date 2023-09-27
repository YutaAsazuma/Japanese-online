import { useNavigate, useLocation } from "react-router";
import React, { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../UserContext";

const Login = () => {
  const { setUser, handleLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const API = axios.create({
    baseURL: "http://localhost:3001",
    withCredentials: true,
  });

  const submitLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please provide both email and password.");
      return;
    }
    try {
      const loginData = {
        email: email,
        password: password
      };
      const res = await API.post("/login", loginData);
      console.log('API Response:', res.data);
      const receivedData = res.data;
        if (receivedData.status.code === 200) {
          navigate(from, { replace: true });
          handleLogin(receivedData);
          // if (receivedData) {
          //   setUser(receivedData.user);
          // } else {
          //   console.error('User is undefined', receivedData);
          // }
        } else {
          setError("Incorrect credentials.");
        }
      } catch (err) {
      if (!err?.response) {
        setError("no server response");
      } else {
        setError("Login failed. Please try again later.");
      }
    }
  };

  return (
    <div className="login-wrapper">
      <h1>Log in</h1>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <form onSubmit={submitLogin}>
        <label>
          <p>Email</p>
          <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Log in</button>
        </div>
      </form>
    </div>
  )
}

export default Login;
