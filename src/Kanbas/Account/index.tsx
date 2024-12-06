import { Routes, Route, Navigate } from "react-router";
import AccountNavigation from "./Navigation";
import Signin from "./Signin";
import Profile from "./Profile";
import Signup from "./Signup";
import Users from "./Users";
import { ProtectedRoute } from "./ProtectedRoute";
import { useKanbasSelector } from "../../hooks";

export default function Account() {
  const { currentUser } = useKanbasSelector(state => state.accountReducer);
  return (
    <div id="wd-account-screen">
      <table>
        <tbody>
          <tr>
            <td valign="top">
              <AccountNavigation />
            </td>
            <td valign="top">
              <h2>Account</h2>
              <Routes>
                <Route path="/" element={<Navigate to={currentUser ? "Profile" : "Signin"} />} />
                <Route path="/Signin" element={<Signin />} />
                <Route path="/Profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/Signup" element={<Signup />} />
                <Route path="/Users" element={<ProtectedRoute role="ADMIN"><Users /></ProtectedRoute>} />
                <Route path="/Users/:uid" element={<ProtectedRoute role="ADMIN"><Users /></ProtectedRoute>} />
              </Routes>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
