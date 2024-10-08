import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import "./styles.css";
import ScreenSizeLabel from "../Labs/Lab2/ScreenSizeLabel";

export default function Kanbas() {
  return (
    <div id="wd-kanbas">
      <ScreenSizeLabel />
      <KanbasNavigation />
      <div className="wd-main-content-offset p-3">
      <h1>Kanbas</h1>
        <Routes>
          <Route path="/" element={<Navigate to="Account" />} />
          <Route path="/Account/*" element={<Account />} />
          <Route path="/Dashboard/*" element={<Dashboard />} />
          <Route path="/Courses" element={<Dashboard />} />
          <Route path="/Courses/:cid/*" element={<Courses />} />
          <Route path="/Calendar" element={<h1>Calendar</h1>} />
          <Route path="/Inbox" element={<h1>Inbox</h1>} />
        </Routes>
      </div>
    </div>
  );
}
