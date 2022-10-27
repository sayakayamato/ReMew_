import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import { FriendsContents } from "../friendPages/FriendsContents";
import { HomeContents } from "../homePages/HomeContents";
import { NewFriendModal } from "../friendPages/NewFriendModal";
import { Navigate } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { MdOutlineArticle } from "react-icons/md";
import { MdGroup } from "react-icons/md";
import { useAuthContext } from "../../contexts/AuthContext";
import { CollectFeedback } from "../homePages/CollectFeedback";
import { MyProfilePage } from "../myPages/MyprofilePage";
import { useTabContext } from "../../contexts/TabContext";
import { Header } from "./Header";

export function UnderTabBar() {
  const { user } = useAuthContext();
  const { tab, setTab } = useTabContext();

  if (!user) {
    return <Navigate replace to="/login" />;
  } else {
    return (
      <>
        <Header />
        <Tabs
          variant="soft-rounded"
          colorScheme="gray"
          isFitted="true"
          className="under_tab_bar"
          // defaultIndex={0}
          onChange={(index) => setTab(index)}
          defaultIndex={tab}
        >
          <TabPanels>
            <TabPanel>
              <HomeContents />
            </TabPanel>
            <TabPanel>
              <CollectFeedback initialText="" />
            </TabPanel>
            <TabPanel>
              <MyProfilePage />
            </TabPanel>
            <TabPanel>
              <p className="friend">Friend</p>
              <FriendsContents />
              <NewFriendModal />
            </TabPanel>
          </TabPanels>
          <TabList className="under_nav_bar">
            <Tab color={"#704116"}>
              <MdHome />
              Home
            </Tab>
            <Tab color={"#704116"}>
              <MdOutlineArticle />
              投稿
            </Tab>
            <Tab color={"#704116"}>プロフ</Tab>
            <Tab color={"#704116"}>
              <MdGroup />
              Friend
            </Tab>
          </TabList>
        </Tabs>
      </>
    );
  }
}
