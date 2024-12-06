import { NavLink, NavLinkRenderProps, useLocation } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";

function linkStyle(props : NavLinkRenderProps) {
  return "list-group-item list-group-item-action text-center border-0"
         + (props.isActive ? " bg-white text-danger" : " bg-black text-white");
}

export default function KanbasNavigation() {
  const {pathname} = useLocation();
  const links = [
    { label: "Account", path: "/Kanbas/Account", icon: FaRegCircleUser, iconColor: "text-white"},
    { label: "Dashboard", path: "/Kanbas/Dashboard", icon: AiOutlineDashboard, iconColor: "text-danger"},
    { label: "Courses",   path: "/Kanbas/Dashboard", icon: LiaBookSolid, iconColor: "text-danger"},
    { label: "Calendar",  path: "/Kanbas/Calendar",  icon: IoCalendarOutline, iconColor: "text-danger" },
    { label: "Inbox",     path: "/Kanbas/Inbox",     icon: FaInbox, iconColor: "text-danger" },
    { label: "Labs",      path: "/Labs",             icon: LiaCogSolid, iconColor: "text-danger" },
  ];

  return (
    <div id="wd-kanbas-navigation" style={{ width: 110 }}
      className="list-group rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2">
      <a href="https://www.northeastern.edu/" id="wd-neu-link" target="_blank"
        className="list-group-item text-center border-0 bg-black">
        <img src="/images/NEU.png" width="75px" /></a>
      {links.map((link) => (
        <NavLink key={link.label} to={link.path} className={linkStyle}>
          {link.icon({className: `fs-1 ${pathname.includes("Account") ? "text-danger" : link.iconColor}`})}
          <br/>
          {link.label}
        </NavLink>
      ))}
    </div>
);}
