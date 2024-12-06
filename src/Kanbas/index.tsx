import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import "./styles.css";
import {useEffect, useState} from "react";
import { ProtectedRoute } from "./Account/ProtectedRoute";
import EnrollmentProtectedRoute from "./EnrollmentProtectedRoute";
import Session from "./Account/Session";
import * as courseClient from "./Courses/client";
import { useKanbasSelector } from "../hooks";
import * as userClient from "./Account/client"

export interface Course {
  _id: string,
  name: string,
  number: string,
  startDate: string,
  endDate: string,
  department: string,
  credits: number,
  image?: string,
  description: string,
  author?: string,
  enrolled?: boolean
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
    (typeof obj.image === "string" || obj.author === undefined) &&
    typeof obj.description === "string" &&
    (typeof obj.author === "string" || obj.author === undefined) &&
    (typeof obj.enrolled === "boolean" || obj.enrolled === undefined)
  );
}

export default function Kanbas() {
  const [courses, setCourses] = useState<Course[]>([]);
  const { currentUser } = useKanbasSelector(state => state.accountReducer);
  const [enrolling, setEnrolling] = useState<boolean>(false);
  const findCoursesForUser = async () => {
    if (!currentUser) return;
    try {
      const courses = await userClient.findCoursesForUser(currentUser._id);
      if (courses) {
        setCourses(courses);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const updateEnrollment = async (courseId: string, enrolled: boolean) => {
    if (!currentUser) return;
    if (enrolled) {
      await userClient.enrollIntoCourse(currentUser._id, courseId);
    } else {
      await userClient.unenrollFromCourse(currentUser._id, courseId);
    }
    setCourses(
      courses.map((course) => {
        if (course._id === courseId) {
          return { ...course, enrolled: enrolled };
        } else {
          return course;
        }
      })
    );
  };


  const fetchCourses = async () => {
    if (!currentUser) return;
    try {
      const allCourses = await courseClient.fetchAllCourses();
      const enrolledCourses = await userClient.findCoursesForUser(
        currentUser._id
      );
      if (allCourses && enrolledCourses) {
        const courses = allCourses.map(course => {
          if (enrolledCourses.find(c => c._id === course._id)) {
            return { ...course, enrolled: true };
          } else {
            return course;
          }
        });
        setCourses(courses);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (enrolling) {
      fetchCourses();
    } else {
      findCoursesForUser();
    }
  }, [currentUser, enrolling]);

  const [course, setCourse] = useState<Course>({
    _id: "0", name: "New Course", number: "new number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "/images/reactjs.jpg", description: "New Description",
    credits: 4, department: "new department"
  });
  const addNewCourse = async () => {
    const newCourse = await courseClient.createCourse(course);
    if (newCourse) {
      setCourses([...courses, newCourse]);
    }
  }
  const deleteCourse = async (courseId: string) => {
    await courseClient.deleteCourse(courseId);
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
                            updateCourse={updateCourse}
                            enrolling={enrolling}
                            setEnrolling={setEnrolling}
                            updateEnrollment={updateEnrollment}/>
              </ProtectedRoute>
            } />
            <Route path="/Courses" element={
              <ProtectedRoute>
                <Dashboard  courses={courses}
                          course={course}
                          setCourse={setCourse}
                          addNewCourse={addNewCourse}
                          deleteCourse={deleteCourse}
                          updateCourse={updateCourse}
                          enrolling={enrolling}
                          setEnrolling={setEnrolling}
                          updateEnrollment={updateEnrollment}/>
              </ProtectedRoute>
            } />
            <Route path="/Courses/:cid/*" element={<EnrollmentProtectedRoute courses={courses}>
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
