import { Button, Link } from "@chakra-ui/react";
import { BiUserPlus } from "react-icons/bi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useUserDataContext } from "../../contexts/UserDataContext";
import { useAddFriend } from "../../hooks/useAddFriend";
import { useFirebase } from "../../hooks/useFirebase";
import { Header } from "../templates/Header";

export const AddFriendProcess = () => {
  const { user } = useAuthContext();
  const { userData } = useUserDataContext()
  const addFriend = useAddFriend;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const friendId = searchParams.get("userId");
  const { data } = useFirebase(`users/${friendId}`);
  const friendUserName = searchParams.get("userName");
  const onClick = () => {
    addFriend(
      userData.userId,
      friendId,
      userData.userName,
      data.userName,
      userData.userPhoto,
      data.userPhoto,
      userData.background,
      data.background
    );
    navigate("/");
  };
  if (!user) {
    return (
      <>
        <p>先にログインしてから読み込んでください</p>
        <Button>
          <Link to="/login">ログイン画面へ </Link>
        </Button>
      </>
    );
  }
  return (
    <>
      <Header />
      <p>{friendUserName}さんを友達に追加する</p>
      {data && (
        <Button leftIcon={<BiUserPlus />} colorScheme="blue" onClick={onClick}>
          追加
        </Button>
      )}
    </>
  );
};
