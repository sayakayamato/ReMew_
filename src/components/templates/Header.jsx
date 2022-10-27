import { useEffect } from "react";
import { Flex, Spacer } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Avatar, Wrap, WrapItem } from "@chakra-ui/react";
import {
  child,
  equalTo,
  onValue,
  orderByChild,
  query,
  ref,
  update,
} from "firebase/database";

import { db } from "../../lib/firebase";
import { useUserDataContext } from "../../contexts/UserDataContext";
import { useAuthContext } from "../../contexts/AuthContext";
import { useFriendsIdContext } from "../../contexts/FriendsIdContext";
import { useFriendsListContext } from "../../contexts/FriendsListContext";
import { useFriendsUniqueIdContext } from "../../contexts/FriendsUniqueIdContext";

export const Header = () => {
  const { userData, setUserData } = useUserDataContext();
  const { user } = useAuthContext();
  const { setFriendsId } = useFriendsIdContext();
  const { setFriendsList } = useFriendsListContext();
  const { friendsUniqueId, setFriendsUniqueId } = useFriendsUniqueIdContext();

  //   const { data } = useFirebase("users/" + user.uid);
  useEffect(() => {
    const tableName = "users/" + user.uid;
    const pathRef = ref(db, tableName);
    onValue(
      pathRef,
      (snapshot) => {
        const newData = snapshot.val();
        setUserData(newData);
      },
      (error) => {
        // setErrors(error);
      }
    );
  }, [setUserData, user.uid]);

  // フレンドリスト（ID版とデータ版
  // リスト
  const tableName = "friends";
  useEffect(() => {
    const rootRef = ref(db);
    const tableRef = child(rootRef, tableName);
    // クエリ処理
    const listRef = query(tableRef, orderByChild("ownerId"), equalTo(user.uid));
    onValue(listRef, (snapshot) => {
      const newData = snapshot.val();
      setFriendsList(
        Object.entries(newData == null ? {} : newData).map(([key, item]) => {
          return item;
        })
      );
      setFriendsId(
        Object.entries(newData == null ? {} : newData).map(([key, item]) => {
          return item.userId;
        })
      );
    });
  }, [setFriendsId, setFriendsList, user.uid]);

  useEffect(() => {
    const rootRef = ref(db);
    const tableRef = child(rootRef, tableName);
    // クエリ処理
    const listRef = query(tableRef, orderByChild("userId"), equalTo(user.uid));
    onValue(listRef, (snapshot) => {
      const newData = snapshot.val();
      setFriendsUniqueId(
        Object.entries(newData == null ? {} : newData).map(([key, item]) => {
          return key;
        })
      );
    });
  }, [setFriendsUniqueId, user.uid]);

  useEffect(() => {
    const tableName = "friends";
    const tableRef = child(ref(db), tableName);
    friendsUniqueId &&
      friendsUniqueId.map((fuid) => {
        update(child(tableRef, fuid), {
          userName: userData.userName,
          userPhoto: userData.userPhoto,
          background: userData.background,
        });
        return null;
      });
  }, [friendsUniqueId, userData.userName, userData.userPhoto]);

  return (
    <div className="top_bar">
      <Flex>
        <Link to="/">
          <img
            src="ReMew_logo.jpg"
            alt="Homeに戻る"
            width={"90px"}
            className="service_name"
          />
        </Link>
        <Spacer />
        {/* TODO: リリース時はadminの制限が必要 */}
        {/* {process.env.REACT_APP_ADMIN_MODE &&
          process.env.REACT_APP_ADMIN_MODE === "ON" && (
            <>
              <Link to="/admin">
                <p style={{ margin: "auto", padding: "auto" }}>アドミン</p>
              </Link>
              <Spacer />
            </>
          )} */}

        <Link to="/settings">
          <Wrap className="top_profile_icon">
            <WrapItem>
              <Avatar name={userData.userName} src={userData.userPhoto} />
            </WrapItem>
          </Wrap>
        </Link>
      </Flex>
    </div>
  );
};
