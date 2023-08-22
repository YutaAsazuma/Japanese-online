import { createContext } from "react";

const UserContext = createContext({
  user: null,
  setUser: null,
  isAdmin: false,
  setIsAdmin: false
});
export default UserContext;
