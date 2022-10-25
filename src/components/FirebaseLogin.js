import { useEffect, useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Navigate, useLocation } from "react-router-dom";
import { uiConfig, auth } from "../lib/firebase";

import { ref, set, onValue } from "firebase/database";
import { db } from "../lib/firebase";
import { useDataCreate } from "../hooks/useDataCreate";

function FirebaseLogin() {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  const dataCreate = useDataCreate;

  // 現在のURLの確認(無限ループ防止)
  const location = useLocation();
  const isOnLoginPage = location.pathname === "/login";

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        console.log("You have to sign in");
      } else {
        const usersRef = ref(db, "users/" + user.uid);
        onValue(usersRef, (snapshot) => {
          if (snapshot.val() === null) {
            set(usersRef, {
              userId: user.uid,
              displayName: user.displayName,
              userPhoto: user.photoURL,
              background:
                "https://firebasestorage.googleapis.com/v0/b/prof3know.appspot.com/o/images%2Fbackgrounds%2Frij7aj2q42.jpg?alt=media&token=32de7aef-6952-481e-8453-fda08f612148",
            });
            const friendUserData = {
              userId: user.uid,
              userName: user.displayName,
              userPhoto: user.photoURL,
              ownerId: user.uid,
            };
            const tableLoggedIn = `friends`;
            dataCreate(tableLoggedIn, friendUserData);
            return true;
          } else {
            return false;
          }
        });
      }
      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  // 本来いるページと異なる場合はNavigateを返す
  if (!isSignedIn && !isOnLoginPage) return <Navigate replace to="/login" />;
  if (isSignedIn && isOnLoginPage) return <Navigate replace to="/" />;

  if (!isSignedIn) {
    return (
      <div>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      </div>
    );
  }
  return (
    <div>
      <p>Welcome {auth.currentUser.displayName}! You are now signed-in!</p>
      <div onClick={() => auth.signOut()}>Sign-out</div>
    </div>
  );
}

export default FirebaseLogin;
