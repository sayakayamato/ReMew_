import { useContext, createContext, useState } from "react";
import { useAuthContext } from "./AuthContext";

const UserDataContext = createContext();

export const useUserDataContext = () => {
  return useContext(UserDataContext);
};

export const UserDataProvider = ({ children }) => {
  const { user } = useAuthContext();
  const [userData, setUserData] = useState({
    displayName: user ? user.displayName : "",
    userPhoto: user ? user.photoURL : "",
    userId: user ? user.uid : "",
    background: "",
  });
  const context = {
    userData,
    setUserData,
  };

  return (
    <UserDataContext.Provider value={context}>
      {children}
    </UserDataContext.Provider>
  );
};
