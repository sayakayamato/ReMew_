import { FriendsComponent } from "./FriendsComponent";
import { useFriendsListContext } from "../../contexts/FriendsListContext";
import { sortByStrings } from "../../lib/util/sortByStrings";
import { useAuthContext } from "../../contexts/AuthContext";

export function FriendsContents() {
  const { user } = useAuthContext();
  const { friendsList } = useFriendsListContext();
  const sortedFriendsList = sortByStrings(
    friendsList ? friendsList : [],
    "userName"
  );
  return (
    <ul style={{ listStyle: "none" }}>
      {sortedFriendsList &&
        sortedFriendsList.map((item) => {
          return item.userId === user.uid ? (
            <li key={item.userId}></li>
          ) : (
            <li key={item.userId}>
              <FriendsComponent
                userPhoto={item.userPhoto}
                userName={item.userName}
              />
            </li>
          );
        })}
    </ul>
  );
}
