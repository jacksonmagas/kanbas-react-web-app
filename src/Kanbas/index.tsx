import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import "./styles.css";
import {useEffect, useState} from "react";
import { ProtectedRoute } from "./Account/ProtectedRoute";
import EnrollmentProtectedRoute from "./Account/EnrollmentProtectedRoute";
import Session from "./Account/Session";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";
import { useSelector } from "react-redux";
import { RootState } from "./store";

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

export function isCourse(obj: any): obj is Course {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj._id === "string" &&
    typeof obj.name === "string" &&
    typeof obj.number === "string" &&
    typeof obj.startDate === "string" &&
    typeof obj.endDate === "string" &&
    typeof obj.department === "string" &&
    typeof obj.credits === "number" &&
    typeof obj.image === "string" &&
    typeof obj.description === "string" &&
    (typeof obj.author === "string" || obj.author === undefined)
  );
}

export default function Kanbas() {
  const [courses, setCourses] = useState<Course[]>([]);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const fetchCourses = async () => {
    try {
      const courses = await courseClient.fetchAllCourses();
      if (Array.isArray(courses) && courses.every(isCourse)) {
        setCourses(courses);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, [currentUser]);

  const [course, setCourse] = useState<Course>({
    _id: "0", name: "New Course", number: "new number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "/images/reactjs.jpg", description: "New Description",
    credits: 4, department: "new department"
  });
  const addNewCourse = async () => {
    const newCourse = await userClient.createCourse(course);
    if (isCourse(newCourse)) {
      setCourses([...courses, newCourse]);
    }
  }
  const deleteCourse = async (courseId: string) => {
    const status = await courseClient.deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
  };
  const updateCourse = async () => {
    await courseClient.updateCourse(course);
    setCourses(courses.map((c) => {
        if (c._id === course._id) { return course; }
        else { return c; }
    })
  );};

  return (
    <Session>
      <div id="wd-kanbas">
        <KanbasNavigation />
        <div className="wd-main-content-offset p-3">
        <h1>Kanbas
        </h1>
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
    </Session>
  );
}
