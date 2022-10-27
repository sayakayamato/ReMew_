import { Avatar } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export function FriendsComponent({ displayUser }) {
  return (
    <div className="friend_component">
      <div className="friend_photo">
        <Avatar src={displayUser.userPhoto} />
      </div>
      <div className="friend_name">
        <Link to={"/profile/" + displayUser.userId}>
          <p>{displayUser.userName}のプロフを見に行く</p>
        </Link>
      </div>
    </div>
  );
}
