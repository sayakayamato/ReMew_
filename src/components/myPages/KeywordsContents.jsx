import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { ObjectiveContents } from "./ObjectiveContents";
import { SubjectiveContents } from "./SubjectiveContents";

export function KeywordsContents() {
  return (
    <>
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>Objective準備中</Tab>
          <Tab>Subjective準備中</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ObjectiveContents />
          </TabPanel>
          <TabPanel>
            <SubjectiveContents />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
