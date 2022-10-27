import { useParams } from "react-router-dom";
import { useFriendsListContext } from "../../contexts/FriendsListContext";
import { MyProfilePage } from "./MyprofilePage";

export const ProfilePage = () => {
  const params = useParams();
  const { friendsList } = useFriendsListContext();
  const displayUser = friendsList.find((e) => e.userId === params.displayId);
  return <MyProfilePage displayUser={displayUser} />;
};
