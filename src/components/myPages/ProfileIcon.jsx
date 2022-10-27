import { Avatar, Wrap, WrapItem } from "@chakra-ui/react";
import "../../css/ProfileInfo.css";
export function ProfileIcon({ displayUser }) {
  return (
    <>
      <Wrap>
        <WrapItem>
          <Avatar
            name={displayUser.userName}
            src={displayUser.userPhoto}
            size="xl"
          />
        </WrapItem>
      </Wrap>
    </>
  );
}
