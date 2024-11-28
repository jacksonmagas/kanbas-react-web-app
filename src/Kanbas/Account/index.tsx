import { Routes, Route, Navigate } from "react-router";
import AccountNavigation from "./Navigation";
import Signin from "./Signin";
import Profile from "./Profile";
import Signup from "./Signup";
import { useSelector } from "react-redux";

export default function Account() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  return (
    <div id="wd-account-screen">
      <table>
        <tr>
	  <td valign="top">
	    <AccountNavigation />
	  </td>
	  <td valign="top">
            <h2>Account</h2>
            <Routes>
              <Route path="/" element={<Navigate to={currentUser ? "Profile" : "Signin"} />} />
              <Route path="/Signin" element={<Signin />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/Signup" element={<Signup />} />
            </Routes>
	  </td>
	</tr>
      </table>
    </div>
  );
}
