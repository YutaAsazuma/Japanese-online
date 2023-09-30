import { createContext } from "react";

const UserContext = createContext({
  user: null,
  setUser: null,
  token: null,
  setToken: null,
});

export default UserContext;
