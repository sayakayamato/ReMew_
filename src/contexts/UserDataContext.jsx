import { useContext, createContext, useState } from "react";
import { useAuthContext } from "./AuthContext";

const UserDataContext = createContext();

export const useUserDataContext = () => {
  return useContext(UserDataContext);
};

export const UserDataProvider = ({ children }) => {
  const { user } = useAuthContext();
  const [userData, setUserData] = useState({
    userName: user ? user.displayName : "",
    userPhoto: user ? user.photoURL : "",
    userId: user ? user.uid : "",
    background:
      "https://firebasestorage.googleapis.com/v0/b/prof3know.appspot.com/o/images%2Fbackgrounds%2Frij7aj2q42.jpg?alt=media&token=32de7aef-6952-481e-8453-fda08f612148",
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
