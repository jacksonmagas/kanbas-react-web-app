import { Link, useLocation } from "react-router-dom";
import "../styles.css";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const links = currentUser ? currentUser.role === "ADMIN" ? ["Profile", "Users"]
                                                           : ["Profile"]
                            : ["Signin", "Signup"];
  const { pathname } = useLocation();
  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => <Link to={`/Kanbas/Account/${link}`}
        className={`list-group-item border border-0 ${pathname.includes(link) ? "active" : "text-danger"}`}>{link}</Link>)}
    </div>
);}
