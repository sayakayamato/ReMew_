import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { KeywordsContents } from "./KeywordsContents";
import { ProfileTabContents } from "./ProfiileTabContents";
import { ProfileIcon } from "./ProfileIcon";
import { useUserDataContext } from "../../contexts/UserDataContext";
import { FeedComponent } from "../feedPages/FeedComponent";

export function MyProfilePage() {
  const { userData } = useUserDataContext();
  return (
    <>
      <div
        className="myprofile_page"
        style={{
          // backgroundImage: `url(${MyprofileImage})`,
          backgroundImage: `url(${userData.background})`,
          backgroundsize: "cover",
          height: "100%",
          width: "100%",
        }}
      >
        <div className="profile_info">
          <div className="profile_icon">
            <ProfileIcon />
          </div>
          <div className="profile_name">{userData.displayName}</div>
        </div>
        <div className="profile_contents">
          <Tabs>
            <TabList className="profile_tablist">
              <Tab className="tab">profile</Tab>
              <Tab className="tab">keywords</Tab>
              <Tab className="tab">feedback</Tab>
            </TabList>
            <TabPanels className="profile_contents_space">
              <TabPanel>
                <ProfileTabContents />
              </TabPanel>
              <TabPanel>
                <KeywordsContents />
              </TabPanel>
              <TabPanel>
                <FeedComponent friendsMode={false} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </>
  );
}
