import { FriendsComponent } from "./FriendsComponent";
import { useFriendsListContext } from "../../contexts/FriendsListContext";
import { sortByStrings } from "../../lib/util/sortByStrings";
import { useUserDataContext } from "../../contexts/UserDataContext";

export function FriendsContents() {
  const { userData } = useUserDataContext();
  const { friendsList } = useFriendsListContext();
  const sortedFriendsList = sortByStrings(
    friendsList ? friendsList : [],
    "userName"
  );
  return (
    <ul style={{ listStyle: "none" }}>
      {sortedFriendsList &&
        sortedFriendsList.map((item) => {
          return item.userId === userData.userId ? (
            <li key={item.userId}></li>
          ) : (
            <li key={item.userId}>
              <FriendsComponent displayUser={item} />
            </li>
          );
        })}
    </ul>
  );
}
