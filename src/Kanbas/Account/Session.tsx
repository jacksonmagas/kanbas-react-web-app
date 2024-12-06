import * as client from "./client";
import { ReactNode, useEffect, useState } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import { setCurrentView } from "../viewReducer";
export default function Session({ children }: { children: ReactNode }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();
  const fetchProfile = async () => {
    try {
      console.log("fetching profile")
      const currentUser = await client.profile();
      dispatch(setCurrentUser(currentUser));
      dispatch(setCurrentView(currentUser ? currentUser.role : currentUser))
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
