import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import Nav from "./Nav"


const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [error, setError] = useState("");

  const submitRegister = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password
        }),
      });

      if (resp.status === 200) {
        navigate(from, { replace: true });
      } else {
        setError("Invalid email or password. Password should be more than 6 caracter")
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  return (
    <div className="login-wrapper">
      <Nav />
      <h1>Sign up</h1>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <form onSubmit={submitRegister}>
        <label>
          <p>Full name</p>
          <input type="name" value={name} onChange={e => setName(e.target.value)}/>
        </label>
        <label>
          <p>Email</p>
          <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Sign up</button>
        </div>
      </form>
    </div>
  )
}

export default SignUp;
