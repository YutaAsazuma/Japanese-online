import React, { useState, useContext, useEffect }  from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import styled, { css } from 'styled-components';
import TypeList from "./TypeList";
import ProductList from "./ProductsList";
import UserContext from "./UserContext";
import Login from "./Login";
import AdminPost from "./AdminPost";
import Container from 'react-bootstrap/Container';
import './App.css'
import axios from "axios";

const Navbar = styled.nav`
  background: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const Logo = styled.div`
  font-weight: bold;
  font-size: 23px;
  letter-spacing: 3px;
`;

const closedStyles = css`
  opacity: 0;
  max-height: 0;
  overflow: hidden;
  transform: translateY(-100%);
  transition: opacity 0.3s, max-height 0.3s, transform 0.3s;
`;

const openStyles = css`
  max-height: 400px;
  opacity: 1;
  transform: translateY(0%);
  transition: opacity 0.3s, max-height 0.3s, transform 0.3s;
`;

const NavItems = styled.ul`
  display: flex;
  margin: revert;
  list-style: none;

  @media (max-width: 768px) {
    ${props => (props.open ? openStyles : closedStyles)}
    position: absolute;
    top: 44px;
    right: 0;
    width: 100%;
    background-color: white;
    flex-direction: column;
    align-items: center;
    z-index: 1;
  }
`;

const NavItem = styled.li`
  font-size: 13px;
  font-weight: bold;
  padding: 5px;
  opacity: 0.7;
  margin-left: 15px;
  margin-right: 15px;
  &:hover {
    opacity: 1;
  }
  @media (max-width: 768px) {
    margin-left: 0;
    margin-right: 0;
  }
`;

const DropdownButton = styled.button`
  display: none;
  background-color: white;
  border: none;
  font-size: 20px;

  @media (max-width: 768px) {
    display: block;
  }
`;



const AdminRoute = ({ children }) => {
  const { isAdmin } = useContext(UserContext);

  if(!isAdmin) {
    return <Navigate to="/" />
  }
    return children;
 }

const Nav = ({ handleLogout }) => {
  const { user, isAdmin } =  useContext(UserContext);
  const [ isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <Navbar>
      <Logo>
        NihhonLine
      </Logo>
      <DropdownButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        {isDropdownOpen ? 'X' : '☰'}
      </DropdownButton>
      <NavItems open={isDropdownOpen}>
        <NavItem onClick={() => setIsDropdownOpen(false)}>
          <Link to="/">Home</Link>
        </NavItem>
        <NavItem onClick={() => setIsDropdownOpen(false)}>
          <Link to="/">Favorite</Link>
        </NavItem>
        <NavItem onClick={() => setIsDropdownOpen(false)}>
          <Link to="/">Cart</Link>
        </NavItem>
        {!user ?
          (
            <>
              <NavItem onClick={() => setIsDropdownOpen(false)}>
                <Link to="/auth/sign_in">Login</Link>
              </NavItem>
              <NavItem onClick={() => setIsDropdownOpen(false)}>
                <Link to="/auth/sign_up">Sign up</Link>
              </NavItem>
            </>
          ) :
            (
              <NavItem onClick={() => {
                handleLogout();
                setIsDropdownOpen(false);
              }}>
                <Link to="/">Logout</Link>
              </NavItem>
            )}
            {isAdmin && (
          <NavItem onClick={() => setIsDropdownOpen(false)}>
            <Link to="/api/v1/products/new">Dear Admin</Link>
        </NavItem>
        )}
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
  const [isAdmin, setIsAdmin] = useState(false);


  const handleLogin = (userData) => {
    setUser(userData);
    setIsAdmin(userData.admin);
  }
  useEffect(() => {
    console.log("User state changed:", user);
  }, [user]);

  const handleLogout = () => {
    axios.delete('/auth/sign_out', {
      headers: {
        'access-token': localStorage.getItem('access-token'),
        'client': localStorage.getItem('client'),
        'uid': localStorage.getItem('uid')
      }
    })
    .then(() => {
      setUser(null);
      setIsAdmin(false);
      localStorage.removeItem('access-token');
      localStorage.removeItem('client');
      localStorage.removeItem('uid');

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
  console.log("Current user state:", user);
  return (
    <>
      <UserContext.Provider value={{ user, setUser, isAdmin, setIsAdmin, handleLogin }}>
        <Nav handleLogout={handleLogout} />
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/types" element={<TypeList />} />
            <Route path="/types/:id/show_products" element={<ProductList />}/>
            <Route path="/auth/sign_in" element={<Login />}/>
            <Route path="/api/v1/products/new" element={<AdminRoute><AdminPost /></AdminRoute>}/>
          </Routes>
        </div>
      </UserContext.Provider>
      {logoutMessage && <div className="logout-message">{logoutMessage}</div>}
    </>
  )
}



export default App;
