import React, { useState, useContext, useEffect }  from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import TypeList from "./components/TypeList";
import ProductList from "./components/ProductsList";
import UserContext from "./UserContext";
import Login from "./components/Login";
import Homepage from "./components/Homepage";
import SignUp from "./components/SignUp";
import AdminPost from "./components/AdminPost";
import FavoritesList from "./components/FavoritesList";
import './App.css'
import ShowProduct from "./components/ShowProduct";



const AdminRoute = ({ children }) => {
  const { user, setUser } = useContext(UserContext);

  if(!user || !user.admin) {
    return <Navigate to="/" />
  }
    return children;
 }

const App = () => {
  const [ logoutMessage, setLogoutMessage ] = useState("");
  let navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  // const [admin, setAdmin] = useState(false);


  const handleLogin = (receivedData) => {
    const user = receivedData.user;
    const token = receivedData.token
    if (user){
      setUser(user);
      setToken(token);
      console.log('user after set:', user);
    } else {
      console.error('Unable to set user in handleLogin. receivedData:', receivedData);
    }
  }
  useEffect(() => {
    console.log("User state changed:", user);
    if (user === undefined) {
      console.trace("User state is undefined");
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    // setAdmin(false);
    localStorage.removeItem('jwtToken')

    setLogoutMessage("Successfully logged out!")
    navigate("/");
    setTimeout(() => {
        setLogoutMessage("");
      }, 3000);
    };

  return (
    <>
      <UserContext.Provider value={{ user, setUser, token, setToken, handleLogin, handleLogout }}>
        <div>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/types" element={<TypeList />} />
            <Route path="/types/:typeId/show_products" element={<ProductList user={user} token={token}/>} />
            <Route path="/products/:productId" element={<ShowProduct  user={user} token={token} />} />
            <Route path="/api/v1/favorites" element={<FavoritesList token={token} />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/signup/sign_up" element={<SignUp />}/>
            <Route path="/api/v1/products/new" element={<AdminRoute><AdminPost /></AdminRoute>}/>
          </Routes>
        </div>
      </UserContext.Provider>
      {logoutMessage && <div className="logout-message">{logoutMessage}</div>}
    </>
  )
}



export default App;
