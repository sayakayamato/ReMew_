import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import "./css/App.css";
import "./css/Home.css";
import { RouterConfig } from "./RouterConfig";
import { AuthProvider } from "./contexts/AuthContext";
import { TabProvider } from "./contexts/TabContext";
import { FriendsListProvider } from "./contexts/FriendsListContext";
import { FriendsIdProvider } from "./contexts/FriendsIdContext";
import { FriendsUniqueIdProvider } from "./contexts/FriendsUniqueIdContext";
import { UserDataProvider } from "./contexts/UserDataContext";

function App() {
  return (
    <AuthProvider>
      <ChakraProvider>
        <div className="phone_size">
          <UserDataProvider>
            <FriendsListProvider>
              <FriendsIdProvider>
                <FriendsUniqueIdProvider>
                  <TabProvider>
                    <BrowserRouter>
                      <RouterConfig />
                    </BrowserRouter>
                  </TabProvider>
                </FriendsUniqueIdProvider>
              </FriendsIdProvider>
            </FriendsListProvider>
          </UserDataProvider>
        </div>
      </ChakraProvider>
    </AuthProvider>
  );
}

export default App;
