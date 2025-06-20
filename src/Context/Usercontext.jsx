import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [GetToken, setGetToken] = useState(null)

 useEffect(() => {
  const storedToken = localStorage.getItem("token");

  if (storedToken) {
    try {
      const decoded = jwtDecode(storedToken);
     

      setToken(storedToken);
      setUserData(decoded);
    } catch (error) {
      console.error("فشل في فك التوكن:", error);
    }
  }
}, []);


  useEffect(() => {
  if (token) {
  }
}, [token]);

useEffect(() => {
  if (userData) {
  }
}, [userData]);





  

  return (
    <UserContext.Provider value={{ token, setToken, userData ,setGetToken,GetToken }}>
      {children}
    </UserContext.Provider>
  );
}
