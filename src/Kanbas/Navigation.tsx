import { NavLink, NavLinkRenderProps } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";

function linkStyle(props : NavLinkRenderProps) {
  return "list-group-item list-group-item-action text-center border-0"
         + (props.isActive ? " bg-white text-danger" : " bg-black text-white");
}

export default function KanbasNavigation() {
  return (
    <div id="wd-kanbas-navigation" style={{ width: 110 }}
      className="list-group rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2">
      <a href="https://www.northeastern.edu/" id="wd-neu-link" target="_blank"
        className="list-group-item text-center border-0 bg-black">
        <img src="/images/NEU.png" width="75px" /></a>
      <NavLink to="/Kanbas/Account" id="wd-account-link"
        className={linkStyle}>
        {props => (<>
        <FaRegCircleUser className={"fs-1 text z-3 text" + (props.isActive ? " text-danger" : " text-white")}/>
        <br/>
        Account</>)}
        </NavLink>
      <NavLink to="/Kanbas/Dashboard" id="wd-dashboard-link"
        className={linkStyle}>
        <AiOutlineDashboard className="fs-1 text-danger" /><br />
        Dashboard</NavLink>
      <NavLink to="/Kanbas/Dashboard" id="wd-course-link"
        className={linkStyle}>
        <LiaBookSolid className="fs-1 text-danger" /><br />
        Courses</NavLink>
      <NavLink to="/Kanbas/Calendar" id="wd-calendar-link"
        className={linkStyle}>
        <IoCalendarOutline className="fs-1 text-danger" /><br />
        Calendar</NavLink>
      <NavLink to="/Kanbas/Inbox" id="wd-inbox-link"
        className={linkStyle}>
        <FaInbox className="fs-1 text-danger" /><br />
        Inbox</NavLink>
      <NavLink to="/Labs" id="wd-labs-link"
        className={linkStyle}>
        <LiaCogSolid className="fs-1 text-danger"/><br />
        Labs</NavLink>
    </div>
);}
