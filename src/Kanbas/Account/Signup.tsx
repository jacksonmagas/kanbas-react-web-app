import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";

interface Passwords {
  original: string,
  verify: string
}

function validatePasswords({original, verify} :Passwords) {
  if (original.length < 5) {
    alert("Password must be at least 5 characters");
  } else if (original !== verify) {
    alert("Passwords must match")
  } else {
    return true;
  }
  return false;
}

export default function Signup() {
  const [username, setUsername] = useState<string>("");
  const [passwords, setPasswords] = useState<Passwords>({original: "", verify: ""});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signup = async () => {
    if (validatePasswords(passwords)) {
      try {
        const currentUser = await client.signup({username: username, password: passwords.original});
        dispatch(setCurrentUser(currentUser));
        if (currentUser) {
          navigate("/Kanbas/Account/Profile");
        }
      } catch (error: unknown) {
        if (typeof error === "object" && error !== null && "response" in error) {
          let res = error.response;
          if (typeof res === "object" && res !== null && "data" in res) {
            let data = res.data;
            if (typeof data === "object" && data !== null && "message" in data) {
              alert(data.message);
            }
          }
        }
      }
    }
  };

  return (
    <div id="wd-signup-screen">
      <h3>Sign in</h3>
      <input id="wd-username" placeholder="username " className="form-control mb-2" onChange={(e) => setUsername(e.target.value)}/>
      <input id="wd-password" placeholder="password" type="password" className="form-control mb-2"
          onChange={(e) => setPasswords({...passwords, original: e.target.value})}/>
      <input id="wd-verify-password" placeholder="verify password" type="password" className="form-control mb-2"
          onChange={(e) => setPasswords({...passwords, verify: e.target.value})}/>
      <button id="wd-signup-btn"
              onClick={signup}
             className="btn btn-primary w-100 mb-2"> Sign up </button>
    </div>
);}
