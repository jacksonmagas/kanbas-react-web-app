import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { isUser, setCurrentUser } from "./reducer";

export default function Signup() {
  const [user, setUser] = useState<any>({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signup = async () => {
    const currentUser = await client.signup(user);
    if (isUser(currentUser) || currentUser === null) {
      dispatch(setCurrentUser(currentUser));
      navigate("/Kanbas/Account/Profile");
    }
  };

  return (
    <div id="wd-signup-screen">
      <h3>Sign in</h3>
      <input id="wd-username" placeholder="username " className="form-control mb-2" />
      <input id="wd-password" placeholder="password" type="password" className="form-control mb-2"/>
      <input id="wd-verify-password" placeholder="verify password" type="password" className="form-control mb-2"/>
      <button id="wd-signup-btn"
              onClick={signup}
             className="btn btn-primary w-100 mb-2"> Sign up </button>
    </div>
);}
