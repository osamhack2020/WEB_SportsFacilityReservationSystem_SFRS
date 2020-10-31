import React, { useEffect, useState } from "react";
import app from "./firebase";

export const AuthContext = React.createContext();

export const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userInfo, setUserInfo] = useState(false);

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      if (user) {
        app
          .firestore()
          .collection("users")
          .where("uid", "==", user.uid)
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              setUserInfo(doc.data());
            });
          });
      }
      setCurrentUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userInfo,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
