import * as client from "./client";
import { useEffect, useState } from "react";
import { isUser, setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
export default function Session({ children }: { children: any }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();
  const fetchProfile = async () => {
    try {
      console.log("fetching profile")
      const currentUser = await client.profile();
      console.log(currentUser);
      if (isUser(currentUser) || currentUser === null) {
        dispatch(setCurrentUser(currentUser));
      } else {
        throw new Error("Did not get user");
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
