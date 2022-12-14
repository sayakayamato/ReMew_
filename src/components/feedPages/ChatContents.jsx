import { useEffect, useState } from "react";
import { Avatar, Input } from "@chakra-ui/react";

import { useDataList } from "../../hooks/useDataList";
import { useDataCreate } from "../../hooks/useDataCreate";

import "../../css/Chats.css";
import { useAuthContext } from "../../contexts/AuthContext";
import { useFriendsListContext } from "../../contexts/FriendsListContext";
import { useUserDataContext } from "../../contexts/UserDataContext";

export function ChatContents({ feedId }) {
  //inputに入力したチャットテキスト
  const [inputChatText, setInputChatText] = useState("");
  // const dataList = useDataList;
  const dataCreate = useDataCreate;
  const tableName = "chats";
  const queryKey = "feedId";
  const queryValue = feedId;
  const { user } = useAuthContext();
  const { userData } = useUserDataContext()
  const { friendsList } = useFriendsListContext();
  const [anonymousUsername, setAnonymousUsername] = useState("");
  const [loggedInUserId, setLoggedInUserId] = useState("");
  const [loggedInUsername, setLoggedInUsername] = useState("");

  const dataList = useDataList;
  const { data } = dataList(tableName, queryKey, queryValue);

  useEffect(() => {
    if (user) {
      setLoggedInUserId(userData.uid);
      setLoggedInUsername(userData.userName);
    } else {
      setLoggedInUserId("anonymous");
      setLoggedInUsername("");
    }
  }, []);

  //送信ボタンを押したときの処理
  const onClickSend = () => {
    if (inputChatText === "") return; //空文字で送信ボタンを押したときに処理が走らないようにする
    if (!user && anonymousUsername === "") return; //空文字で送信ボタンを押したときに処理が走らないようにする

    // データ保存処理
    const newChatObject = {
      content: inputChatText,
      feedId: feedId,
      resUserId: loggedInUserId,
      resUsername: user ? loggedInUsername : anonymousUsername,
      createdAt: new Date().toISOString(),
    };

    const tableName = "chats";

    dataCreate(tableName, newChatObject);
    setInputChatText("");
  };
  return (
    <>
      <div className="chats_answer">
        {data &&
          Object.entries(data).map(([key, item]) => {
            return (
              <div
                key={key}
                className={item.resUserId === loggedInUserId ? "right" : "left"}
              >
                {item.resUserId === "anonymous" ? (
                  <>
                    <div className="chats_user_info">
                      <div className="chat_user_icon">
                        <Avatar size="md" />
                      </div>
                      <div>
                        <p className="chat_send_user">{item.resUsername}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    
                      
                      <div>
                        <p>
                          {
                            friendsList.find((e) => e.userId === item.resUserId)
                              .userName
                          }
                        </p>
                      </div>
                      <div>
                        <Avatar
                          size="md"
                          src={
                            friendsList.find((e) => e.userId === item.resUserId)
                              .userPhoto
                          }
                          alt={item.resUsername}
                        />
                      </div>
                    
                  </>
                )}
                <div className="text_feeld">
                  <p className="chat_send_text">{item.content}</p>
                </div>
              </div>
            );
          })}
      </div>
      <div className="send_feeld">
        <div className="send_form">
          {!user && (
            <Input
              placeholder="あなたのお名前を教えてください"
              value={anonymousUsername}
              onChange={(e) => setAnonymousUsername(e.target.value)}
              w={"85%"}
            ></Input>
          )}
          {!user && <input type="hidden" value="anonymous" />}
          <Input
            placeholder="コメントを送信"
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
