import React, { useState, useContext }  from 'react'
import UserContext from "../UserContext";
import { Link } from "react-router-dom";
import styled, { css } from 'styled-components';

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
          <Link to='/api/v1/favorites'>Favorite</Link>
        </NavItem>
        <NavItem onClick={() => setIsDropdownOpen(false)}>
          <Link to="/">Cart</Link>
        </NavItem>
        {!user ?
          (
            <>
              <NavItem onClick={() => setIsDropdownOpen(false)}>
                <Link to="/login">Login</Link>
              </NavItem>
              <NavItem onClick={() => setIsDropdownOpen(false)}>
                <Link to="/signup">Sign up</Link>
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


export default Nav;
