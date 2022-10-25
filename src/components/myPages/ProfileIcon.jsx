import { Avatar, Wrap, WrapItem } from "@chakra-ui/react";
import "../../css/ProfileInfo.css";
import { useUserDataContext } from "../../contexts/UserDataContext";
export function ProfileIcon() {
  const { userData } = useUserDataContext();

  return (
    <>
      <Wrap>
        <WrapItem>
          <Avatar
            name={userData.displayName}
            src={userData.userPhoto}
            size="xl"
          />
        </WrapItem>
      </Wrap>
    </>
  );
}
