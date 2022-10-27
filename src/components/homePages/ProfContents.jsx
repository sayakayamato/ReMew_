import { useState } from "react";
import { Avatar, Input } from "@chakra-ui/react";

import { useDataList } from "../../hooks/useDataList";
import { useDataCreate } from "../../hooks/useDataCreate";

import "../../css/Chats.css";
import { useFriendsIdContext } from "../../contexts/FriendsIdContext";
import { useFriendsListContext } from "../../contexts/FriendsListContext";
import { useUserDataContext } from "../../contexts/UserDataContext";

export function ProfContents({ profId, profText, categoryId }) {
  const [inputChatText, setInputChatText] = useState("");
  const dataCreate = useDataCreate;
  const tableName = "profs";
  const { userData } = useUserDataContext();
  const { friendsList } = useFriendsListContext();

  const dataList = useDataList;

  const { friendsId } = useFriendsIdContext();

  const tmpArr = [];
  const listId = [...friendsId];

  for (let i = 0; i < listId.length; i++) {
    const queryKey = "combProfUserId";
    const queryValue = profId + listId[i];
    const { data: response } = dataList(tableName, queryKey, queryValue);
    response && tmpArr.push(response);
  }

  const onClickSend = () => {
    if (inputChatText === "") return;
    // データ保存処理
    const newChatObject = {
      content: inputChatText,
      profId: profId,
      resUserId: userData.userId,
      resUsername: userData.userName,
      categoryId: categoryId,
      profContent: profText,
      combProfUserId: profId + userData.userId,
      combCatgoryUserId: categoryId + userData.userId,
      createdAt: new Date().toISOString(),
    };
    const tableName = "profs";
    dataCreate(tableName, newChatObject);
    setInputChatText("");
  };

  return (
    <>
      <div className="chats_answer">
        {tmpArr &&
          tmpArr.map((data) => {
            return Object.entries(data).map(([key, item]) => {
              return (
                <div
                  key={key}
                  className={item.resUserId === userData.userId ? "right" : "left"}
                >
                  <Avatar
                    src={
                      friendsList.find((e) => e.userId === item.resUserId)
                        .userPhoto
                    }
                    alt={item.resUsername}
                  />
                  <p className="chat_send_user">
                    {
                      friendsList.find((e) => e.userId === item.resUserId)
                        .userName
                    }
                  </p>
                  <p className="chat_send_text">{item.content}</p>
                </div>
              );
            });
          })}
      </div>
      <div className="send_feeld">
        <div className="send_form">
          <Input
            placeholder="プロフに回答"
            value={inputChatText}
            onChange={(e) => setInputChatText(e.target.value)}
            w={"85%"}
          />
          <button onClick={onClickSend} className="chat_send_button">
            送信
          </button>
        </div>
      </div>
    </>
  );
}
