import { useState } from "react";
import { child, update } from "firebase/database";
import { useAuthContext } from "../../contexts/AuthContext";
import { useUserDataContext } from "../../contexts/UserDataContext";
import { db } from "../../lib/firebase";
import { databaseRef } from "../databaseRef";
import { FileUpLoader } from "../FileUpLoader";
import { Avatar, Button } from "@chakra-ui/react";

export const EditDisplayName = () => {
  const { user } = useAuthContext();
  const { userData, setUserData } = useUserDataContext();
  const [inputName, setInputName] = useState("");

  const usersTable = "users/";
  const usersQueryValue = user.uid;
  const usersTableRef = child(databaseRef(db), usersTable);
  const usersRef = child(usersTableRef, usersQueryValue);

  const onClick = () => {
    if (inputName === "") return;
    update(usersRef, { displayName: inputName });
    setUserData({
      displayName: inputName,
      userId: userData.userId,
      userPhoto: userData.userPhoto,
    });
  };

  return (
    <>
      <p>{userData.displayName}</p>
      <input
        type="text"
        onChange={(e) => {
          setInputName(e.target.value);
        }}
      />
      <Button onClick={onClick}>変更</Button>
    </>
  );
};
export const EditProfileImage = () => {
  const { userData } = useUserDataContext();
  return (
    <>
      <Avatar alt="db" src={userData.userPhoto} />
      <FileUpLoader imageType="profiles" />
    </>
  );
};
export const EditBackgroundImage = () => {
  const { userData } = useUserDataContext();
  return (
    <>
      <img
        style={{ height: "100px" }}
        alt={userData.background}
        src={userData.background}
      />
      <FileUpLoader imageType="backgrounds" />
    </>
  );
};
