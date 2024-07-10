import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState(localStorage.getItem('userToken'));
  const [userName, setUserName] = useState(localStorage.getItem('userName'));

  useEffect(() => {
    if (userToken) {
      const decoded = jwtDecode(userToken);
      setUserName(decoded.userName);
      setUser(decoded.userName);
      localStorage.setItem('userName', decoded.userName);
    } else {
      setUser(null);
      setUserName(null);
    }
  }, [userToken]);

  return (
    <UserContext.Provider value={{ user, setUser, userToken, setUserToken, userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
