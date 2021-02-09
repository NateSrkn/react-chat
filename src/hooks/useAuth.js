import { useEffect, useState, createContext, useContext } from "react";
import { auth, provider } from "../services/firebase";

export const currentUserContext = createContext({
  currentUser: null,
  isLoading: false,
});

export const useCurrentUser = () => {
  const currentUser = useContext(currentUserContext);
  return currentUser;
};

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(!currentUser);
  const onChange = (user) => {
    setCurrentUser(user);
    setIsLoading(false);
  };

  useEffect(() => {
    const authChange = auth().onAuthStateChanged(onChange);
    return () => authChange();
  }, []);
  return { currentUser, isLoading };
};

export const useSignOut = () => {
  auth().signOut();
};

export const useSignIn = () => {
  auth().signInWithPopup(provider);
};
