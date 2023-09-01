import { useNavigate, useLocation } from "react-router";
import React, { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../UserContext";

const Login = () => {
  const { setIsAdmin, handleLogin } = useContext(UserContext);
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
    try {
      const res = await API.post("/login", { user: { email, password }})
              .then((res) => {
        const receivedData = res.data;
        if (receivedData.status.code === 200) {
          navigate(from, { replace: true });
          handleLogin({
            user: receivedData,
            admin: receivedData.admin ? true : false
          });

        } else {
          console.log("incorrect submission");
          setError(res.message);
        }
      });
    } catch (err) {
      if (!err?.response) {
        setError("no server response");
      } else {
        setError("registration failed");
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
