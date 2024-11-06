import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import "./styles.css";
import * as db from "./Database";
import {useState} from "react";
import ProtectedRoute from "./Account/ProtectedRoute";
import EnrollmentProtectedRoute from "./EnrollmentProtectedRoute";

export interface Course {
  _id: string,
  name: string,
  number: string,
  startDate: string,
  endDate: string,
  department: string,
  credits: number,
  image: string,
  description: string,
  author?: string
}

export default function Kanbas() {
  const [courses, setCourses] = useState<Course[]>(db.courses);
  const [course, setCourse] = useState<Course>({
    _id: "0", name: "New Course", number: "new number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "/images/reactjs.jpg", description: "New Description",
    credits: 4, department: "new department"
  });
  const addNewCourse = () => {
    const newCourse = {
      ...course, _id: new Date().getTime().toString()
    };
    setCourses([...courses, newCourse]);
  }
  const deleteCourse = (courseId: string) => {
    setCourses(courses.filter((course) => course._id !== courseId))
  };
  const updateCourse = () => {
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })
    );
  };
  return (
    <div id="wd-kanbas">
      <KanbasNavigation />
      <div className="wd-main-content-offset p-3">
      <h1>Kanbas</h1>
        <Routes>
          <Route path="/" element={<Navigate to="Account" />} />
          <Route path="/Account/*" element={<Account />} />
          <Route path="/Dashboard/*" element={
            <ProtectedRoute>
              <Dashboard  courses={courses}
                          course={course}
                          setCourse={setCourse}
                          addNewCourse={addNewCourse}
                          deleteCourse={deleteCourse}
                          updateCourse={updateCourse}/>
            </ProtectedRoute>
          } />
          <Route path="/Courses" element={
            <ProtectedRoute>
              <Dashboard  courses={courses}
                        course={course}
                        setCourse={setCourse}
                        addNewCourse={addNewCourse}
                        deleteCourse={deleteCourse}
                        updateCourse={updateCourse}/>
            </ProtectedRoute>
          } />
          <Route path="/Courses/:cid/*" element={<EnrollmentProtectedRoute>
            <Courses courses={courses}/>
          </EnrollmentProtectedRoute>} />
          <Route path="/Calendar" element={<h1>Calendar</h1>} />
          <Route path="/Inbox" element={<h1>Inbox</h1>} />
        </Routes>
      </div>
    </div>
  );
}
