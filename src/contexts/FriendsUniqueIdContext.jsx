import { useContext, createContext, useState } from "react";

const FriendsUniqueIdContext = createContext();

export const useFriendsUniqueIdContext = () => {
  return useContext(FriendsUniqueIdContext);
};

export const FriendsUniqueIdProvider = ({ children }) => {
  const [friendsUniqueId, setFriendsUniqueId] = useState([]);
  const context = {
    friendsUniqueId,
    setFriendsUniqueId,
  };
  return (
    <FriendsUniqueIdContext.Provider value={context}>
      {children}
    </FriendsUniqueIdContext.Provider>
  );
};
