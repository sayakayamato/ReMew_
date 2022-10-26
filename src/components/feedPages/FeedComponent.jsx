import { Avatar, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useMultiDataList } from "../../hooks/useMultiDataList";
import { useFriendsIdContext } from "../../contexts/FriendsIdContext";
import { sortByStrings } from "../../lib/util/sortByStrings";
import { useFriendsListContext } from "../../contexts/FriendsListContext";
import { useUserDataContext } from "../../contexts/UserDataContext";

export const FeedComponent = ({ friendsMode }) => {
  const navigate = useNavigate();
  const { userData } = useUserDataContext();
  const { friendsId } = useFriendsIdContext();
  const { friendsList } = useFriendsListContext();

  const multiDataList = useMultiDataList;
  const tableName = "questions";
  const queryKey = "userId";
  const queryValueList = friendsMode ? [...friendsId] : [userData.userId];
  const { data: feedContents } = multiDataList(
    tableName,
    queryKey,
    queryValueList
  );
  const sortedFeedContents = sortByStrings(
    feedContents ? feedContents : [],
    "createdAt",
    "d"
  );

  //クリックされた質問判定
  const WhatFeed = (e) => {
    //配列のキーとidが一致してるときにできる処理...
    const pushQuestionID = e.target.id;
    const whatfeedtext = e.target.innerText; //記入した質問本文を定数に入れる
    navigate(`/chats/${pushQuestionID}`, {
      state: { whatfeedtext: whatfeedtext, pushQuestionID: pushQuestionID },
    }); //ページ遷移と共に値を持っていく
  };

  if (feedContents) {
    if (feedContents.length === 0) {
      return (
        <>
          {friendsMode ? (
            <>
              <p>投稿がありません</p>
              <p>上のメニューか投稿タブから投稿するか</p>
              <p>Friendタブから友達追加しましょう</p>
            </>
          ) : (
            <>
              <p>投稿がありません</p>
              <p>HOMEタブのメニューか</p>
              <p>投稿タブから投稿しましょう</p>
            </>
          )}
        </>
      );
    } else {
      return sortedFeedContents.map((content) => {
        return (
          <Box
            className="feed_box"
            bg={"rgba(255, 255, 255, 0.7)"}
            w="100%"
            p={4}
            color="black"
            mb={5}
            key={content.id}
          >
            <Avatar
              name={content.username}
              src={
                friendsList.find((e) => e.userId === content.userId).userPhoto
              }
            ></Avatar>
            <p className="feed_user_name">{friendsList.find((e) => e.userId === content.userId).userName}</p>
            <p
              className="feed_contents_text"
              onClick={WhatFeed}
              id={content.id}
            >
              {content.content}
            </p>
          </Box>
        );
      });
    }
  } else {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }
};
