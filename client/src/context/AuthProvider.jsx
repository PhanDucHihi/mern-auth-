import React, { useContext, useState } from "react";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useGlobalAuthContext = () => {
  return useContext(AuthContext);
};
