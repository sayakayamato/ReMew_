import { Route, Routes } from "react-router-dom";
import { Chats } from "./components/feedPages/Chats";
import { QuestionSamplePage } from "./components/homePages/QuestionSamplePage";
import { ProfSamplePage } from "./components/homePages/ProfSamplePage";
import { UnderTabBar } from "./components/templates/UnderTabBar";
import { FeedContents } from "./components/feedPages/FeedContents";
import { SettingPage } from "./components/myPages/SettingPage";
import FirebaseLogin from "./components/FirebaseLogin";
import { AddFriendProcess } from "./components/friendPages/AddFriendProcess";
// import { AdminPage } from "./components/adminPages/AdminPage";
import { Profs } from "./components/homePages/Profs";
import { CollectFeedbackWithHeader } from "./components/homePages/CollectFeedbackWithHeader";
import { ProfilePage } from "./components/myPages/ProfilePage";

export const RouterConfig = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<UnderTabBar />} />
        <Route path="/login" element={<FirebaseLogin />} />
        <Route path="/friend" element={<AddFriendProcess />} />
        <Route path="/questionsamples" element={<QuestionSamplePage />} />
        <Route path="/profsamples" element={<ProfSamplePage />} />
        <Route
          path="/collectfeedback"
          element={<CollectFeedbackWithHeader />}
        />
        <Route path="/undertabbar" element={<FeedContents />} />
        <Route path="/chats/:feedID" element={<Chats />} />
        <Route path="/profs/:profId" element={<Profs />} />
        <Route path="/settings" element={<SettingPage />} />
        <Route path="/profile/:displayId" element={<ProfilePage />} />
        {/* {process.env.REACT_APP_ADMIN_MODE === "ON" && (
          <Route path="/admin" element={<AdminPage />} />
        )} */}
      </Routes>
    </>
  );
};
