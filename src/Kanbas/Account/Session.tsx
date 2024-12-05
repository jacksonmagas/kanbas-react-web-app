import * as client from "./client";
import { ReactNode, useEffect, useState } from "react";
import { isUser, setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import { setCurrentView } from "../viewReducer";
export default function Session({ children }: { children: ReactNode }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();
  const fetchProfile = async () => {
    try {
      console.log("fetching profile")
      const currentUser = await client.profile();
      console.log(currentUser);
      if (isUser(currentUser) || currentUser === null) {
        dispatch(setCurrentUser(currentUser));
        dispatch(setCurrentView(currentUser ? currentUser.role : currentUser))
      } else {
        throw new Error("Did not get user or null from server");
      }
    } catch (err: any) {
      console.error(err);
    }
    setPending(false);
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  if (!pending) {
    return children;
  }
}
