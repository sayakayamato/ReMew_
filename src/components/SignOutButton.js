import { auth } from "../lib/firebase";
import { useNavigate } from "react-router-dom";
import { useFriendsListContext } from "../contexts/FriendsListContext";
import { useFriendsIdContext } from "../contexts/FriendsIdContext";
import { useFriendsUniqueIdContext } from "../contexts/FriendsUniqueIdContext";

export const SignOutButton = () => {
  const navigate = useNavigate();
  const { setFriendsList } = useFriendsListContext();
  const { setFriendsId } = useFriendsIdContext();
  const { setFriendsUniqueId } = useFriendsUniqueIdContext();
  const signOut = () => {
    setFriendsList([]);
    setFriendsId([]);
    setFriendsUniqueId([]);
    auth.signOut();
    navigate("/login");
  };
  return (
    <button onClick={signOut} style={{ width: "20px", height: "20px" }}>
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        ></path>
      </svg>
    </button>
  );
};
