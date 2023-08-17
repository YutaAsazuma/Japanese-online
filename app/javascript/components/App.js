import React, { useState, useContext }  from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import styled from 'styled-components';
import TypeList from "./TypeList";
import ProductList from "./ProductsList";
import UserContext from "./UserContext";
import Login from "./Login";
import Container from 'react-bootstrap/Container';
import './App.css'
import axios from "axios";

const Navbar = styled.nav`
  background: #dbfffe;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const Logo = styled.div`
  font-weight: bold;
  font-size: 23px;
  letter-spacing: 3px;
`

const NavItems = styled.ul`
  display: flex;
  width: 400px;
  max-width: 40%;
  justify-content: space-around;
  list-style: none;
`

const NavItem = styled.li`
  font-size: 19px;
  font-weight: bold;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`

const Wrapper = styled.div`
  width: 700px;
  max-width: 85%;
  margin: 20px auto;
`

const Nav = ({ handleLogout }) => {
  const { user } =  useContext(UserContext);
  return (
    <Navbar>
      <Logo>
        NihhonLine
      </Logo>
      <NavItems>
        <NavItem>
          <Link to="/">Home</Link>
        </NavItem>
        <NavItem>
          <Link to="/">Favorite</Link>
        </NavItem>
        <NavItem>
          <Link to="/">Ordered</Link>
        </NavItem>
        {!user ?
          (
            <>
              <NavItem>
                <Link to="/users/sign_in">Login</Link>
              </NavItem>
              <NavItem>
                <Link to="/users/sign_up">Sign up</Link>
              </NavItem>
            </>
          ) :
            (
              <NavItem onClick={handleLogout}>
                <Link to="/">Logout</Link>
              </NavItem>
            )
          }
      </NavItems>
    </Navbar>
  )
}

const HomePage = () => {
  return (
    <Container>
      <Container>
        <h1>Products explanation</h1>
      </Container>
      <Container>
        <Link to="/types">Our Products</Link>
      </Container>
    </Container>
  );
}

const App = () => {
  const [ logoutMessage, setLogoutMessage ] = useState("");
  let navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    axios.delete('/users/sign_out')
    .then(() => {
      setUser(null);
      setLogoutMessage("Successfully logged out!")
      navigate('/');
      setTimeout(() => {
        setLogoutMessage("");
      }, 3000);
    })
    .catch(error => {
      console.error("Error logging out", error);
      setLogoutMessage("Error during logout");
      navigate('/');
      // setTimeout(() => {
      //   setLogoutMessage("");
      // }, 3000);
    });
  }
  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <Nav handleLogout={handleLogout} />
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/types" element={<TypeList />} />
            <Route path="/types/:id/show_products" element={<ProductList />}/>
            <Route path="/users/sign_in" element={<Login />}/>
          </Routes>
        </div>
      </UserContext.Provider>
      {logoutMessage && <div className="logout-message">{logoutMessage}</div>}
    </>
  )
}



export default App;
