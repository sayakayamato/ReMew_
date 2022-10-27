import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { KeywordsContents } from "./KeywordsContents";
import { ProfileTabContents } from "./ProfiileTabContents";
import { ProfileIcon } from "./ProfileIcon";
import { useUserDataContext } from "../../contexts/UserDataContext";
import { FeedComponent } from "../feedPages/FeedComponent";
import { Header } from "../templates/Header";

export function MyProfilePage({ displayUser }) {
  const { userData } = useUserDataContext();

  return (
    <>
      {displayUser.userId !== userData.userId && <Header />}
      <div
        className="myprofile_page"
        style={{
          // backgroundImage: `url(${MyprofileImage})`,
          backgroundImage: `url(${displayUser.background})`,
          backgroundsize: "cover",
          height: "100%",
          width: "100%",
        }}
      >
        <div className="profile_info">
          <div className="profile_icon">
            <ProfileIcon displayUser={displayUser} />
          </div>
          <div className="profile_name">{displayUser.userName}</div>
        </div>
        <div className="profile_contents">
          <Tabs>
            <TabList className="profile_tablist">
              <Tab className="tab">profile</Tab>
              <Tab className="tab">keywords</Tab>
              {displayUser.userId === userData.userId && (
                <Tab className="tab">feedback</Tab>
              )}
            </TabList>
            <TabPanels className="profile_contents_space">
              <TabPanel>
                <ProfileTabContents displayUser={displayUser} />
              </TabPanel>
              <TabPanel>
                <KeywordsContents displayUser={displayUser} />
              </TabPanel>
              {displayUser.userId === userData.userId && (
                <TabPanel>
                  <FeedComponent friendsMode={false} />
                </TabPanel>
              )}
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </>
  );
}
