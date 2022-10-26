import { useState, useRef } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { Box, Button } from "@chakra-ui/react";

import { db, storage } from "../lib/firebase";
import { useAuthContext } from "../contexts/AuthContext";
import { child, update } from "firebase/database";
import { databaseRef } from "./databaseRef";
import { useUserDataContext } from "../contexts/UserDataContext";

export const FileUpLoader = ({ imageType }) => {
  const { user } = useAuthContext();
  const { userData, setUserData } = useUserDataContext();

  const usersRef = "users/";
  const queryValue = user.uid;
  const tableRef = child(databaseRef(db), usersRef);
  const listRef = child(tableRef, queryValue);

  const inputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleChangeImage = (e) => {
    console.log("handle change image")
    console.log(e)
    console.log(e.target)
    if (e.target.files[0]) {
      const fnameExtensiton = e.target.files.item(0).name.split(".").pop();
      const randomId = Math.random().toString(32).substring(2);
      const imageRef = ref(
        storage,
        `images/${imageType}/${randomId}.${fnameExtensiton}`
        // `images/${imageType}/${image.name}`
      );
      const metadata = {
        contentType: "image/jpeg",
      };
      console.log("1")
      uploadBytes(imageRef, e.target.files[0], metadata).then((snapshot) => {
        getDownloadURL(imageRef).then((url) => {
          if (imageType === "profiles") {
            console.log("2")
            update(listRef, { userPhoto: url });
            console.log("3")
            setUserData({
              displayName: userData.displayName,
              userId: userData.userId,
              userPhoto: url,
              background: userData.background,
            });
            console.log("4")
          } else if (imageType === "backgrounds") {
            update(listRef, { background: url });
            setUserData({
              displayName: userData.displayName,
              userId: userData.userId,
              userPhoto: userData.userPhoto,
              background: url,
            });
          }
        });
      });
    }
    // setIsLoading(!isLoading);
    console.log("change loading")
  };

  const fileUpload = () => {
    console.log(inputRef.current);
    // setIsLoading(!isLoading);
    inputRef.current.click();
  };

  return (
    <Box>
      {/* <VisuallyHiddenInput type="file" onChange={handleChangeImage} /> */}
      <Button
        isLoading={isLoading}
        variant="contained"
        component="label"
        onClick={fileUpload}
      >
        画像をアップロード
        <input
          type="file"
          ref={inputRef}
          hidden
          onChange={handleChangeImage}
          accept="image/*"
        />
      </Button>
    </Box>
  );
};
