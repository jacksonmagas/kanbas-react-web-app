import CoursesNavigation from "./Navigation";
import { Routes, Route, Navigate, useParams } from "react-router";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Quizzes from "./Quizzes";
import { FaAlignJustify } from "react-icons/fa6";
import PeopleTable from "./People/Table";
import DetailsEditor from "./Quizzes/DetailsEditor";
import Details from "./Quizzes/Details";
import QuizPreview from "./Quizzes/QuizPreview";
import { useKanbasSelector } from "../../hooks";
import { FacultyView } from "../Account/RoleShownContent";
import { BiGlasses } from "react-icons/bi";

export default function Courses({ courses }: { courses: any[]; }) {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name}
        <FacultyView>
          <button className="btn btn-secondary float-end">
            <BiGlasses className="fs-4 me-1" />
            Student View
          </button>
        </FacultyView>
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CoursesNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="Quizzes" element={<Quizzes />} />
            <Route path="Quizzes/:aid" element={<Details />} />
            <Route path="Quizzes/:aid/edit" element={<DetailsEditor />} />
            <Route path="Quizzes/:aid/preview" element={<QuizPreview />} />
            <Route path="People" element={<PeopleTable />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
