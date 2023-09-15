import React, { useState, useContext, useEffect }  from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import TypeList from "./components/TypeList";
import ProductList from "./components/ProductsList";
import UserContext from "./UserContext";
import Login from "./components/Login";
import Nav from "./components/Nav";
import Homepage from "./components/Homepage";
import AdminPost from "./components/AdminPost";
import FavoritesList from "./components/FavoritesList";
import './components/App.css'



const AdminRoute = ({ children }) => {
  const { isAdmin } = useContext(UserContext);

  if(!isAdmin) {
    return <Navigate to="/" />
  }
    return children;
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
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('jwtToken')

    setLogoutMessage("Successfully logged out!")
    navigate("/");
    setTimeout(() => {
        setLogoutMessage("");
      }, 3000);
    };
  return (
    <>
      <UserContext.Provider value={{ user, setUser, isAdmin, setIsAdmin, handleLogin }}>
        <Nav handleLogout={handleLogout} />
        <div>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/types" element={<TypeList />} />
            <Route path="/types/:id/show_products" element={<ProductList />}/>
            <Route path="/api/v1/favorites" element={<FavoritesList />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/api/v1/products/new" element={<AdminRoute><AdminPost /></AdminRoute>}/>
          </Routes>
        </div>
      </UserContext.Provider>
      {logoutMessage && <div className="logout-message">{logoutMessage}</div>}
    </>
  )
}



export default App;
