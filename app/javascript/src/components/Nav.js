import React, { useState, useEffect, useContext, useCallback }  from 'react'
import UserContext from "../UserContext";
import { Link } from "react-router-dom";
import styled, { css } from 'styled-components';
import './Nav.css'

const Navbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 81px;
  pointer-events: auto;
  padding: 0 4.9rem 0 10rem;
  position: ${({ isHomepageTop }) => (isHomepageTop ? 'relative' : 'fixed')};
  z-index: 2;
  width: 100%;
  background-color: ${({ backgroundColor }) => backgroundColor || 'none'};
  transition: transform 0.2s ease, top 0.5s ease;
  transform: translateY(${({ isNavHidden }) => (isNavHidden ? '-100%' : '0')});
`;

const Logo = styled.div`
  font-weight: bold;
  font-size: 23px;
  color: black;
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
  font-size: 18px;
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



const Nav = ({backgroundColor}) => {
  const { user, handleLogout } = useContext(UserContext);
  const [ isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [y, setY] = useState(document.scrollingElement.scrollHeight);
  const [isNavHidden, setIsNavHidden] = useState(false);
  const [isHomepageTop, setIsHomepageTop] = useState(true);

  const handleScroll = useCallback((e) => {
    if (window.scrollY === 0) {
      setIsHomepageTop(true);
    } else if (y > window.scrollY) {
      setIsNavHidden(false);
      setIsHomepageTop(false);
      console.log(y);
    } else if (y < window.scrollY) {
      setIsNavHidden(true);
      setIsHomepageTop(false);
      console.log("scrolling down");
    }
    setY(window.scrollY)
  }, [y]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
      <Navbar isNavHidden={isNavHidden} isHomepageTop={isHomepageTop} backgroundColor={backgroundColor}>
        <Logo>
          <Link to="/">NihhonLine</Link>
        </Logo>
        <DropdownButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          {isDropdownOpen ? 'X' : '☰'}
        </DropdownButton>
        <div>
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
                  <NavItem onClick={() => { setIsDropdownOpen(false); }}>
                    <Link to="/login">Login</Link>
                  </NavItem>
                  <NavItem onClick={() => setIsDropdownOpen(false)}>
                    <Link to="/signup/sign_up">Sign up</Link>
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
                {user && user.admin && (
              <NavItem onClick={() => setIsDropdownOpen(false)}>
                <Link to="/api/v1/products/new">Admin post</Link>
            </NavItem>
            )}
          </NavItems>
        </div>
      </Navbar>
  )
}


export default Nav;
