import { Link, useLocation, useParams } from "react-router-dom";

export default function CoursesNavigation() {
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
  const { cid } = useParams();
  const { pathname }  = useLocation();
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        return (
          <Link key={link} to={`/Kanbas/Courses/${cid}/${link}`}
                className={`list-group-item border border-0 ${pathname.includes(link) ? "active" : "text-danger"}`}>
            {link}
          </Link>
        )
      })}
    </div>
);}
