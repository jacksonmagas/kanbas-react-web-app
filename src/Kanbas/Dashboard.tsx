import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useKanbasDispatch, useKanbasSelector } from "../hooks";
import { Course } from ".";
import { User } from "./Account/reducer";
import { addEnrollment, deleteEnrollment, setEnrollments } from "./enrollmentsReducer";
import * as client from "./client";
import { RoleView } from "./Account/RoleShownContent";
import ViewButton from "./ViewChangeButton";

function NewCourse({ addNewCourse,
  updateCourse, setCourse, course }: {
  addNewCourse: () => void;
  updateCourse: () => void;
  setCourse: (course: Course) => void;
  course: Course}) {
    return (
        <div>
          <h5>New Course
              <button className="btn btn-primary float-end"
                      id="wd-add-new-course-click"
                      onClick={addNewCourse} >
                Add
              </button>
              <button className="btn btn-warning float-end me-2"
                      onClick={updateCourse} id="wd-update-course-click">
                Update
              </button>
          </h5>
          <br />
          <input    value={course.name}
                    className="form-control mb-2"
                    onChange={(e) => setCourse({...course, name: e.target.value})}/>
          <textarea value={course.description}
                    className="form-control"
                    onChange={(e) => setCourse({ ...course, description: e.target.value })}/>
          <hr />
        </div>
    );
}

function isFaculty(user : User) {
  return user.role === "FACULTY";
}

export default function Dashboard(
{ courses, course, setCourse, addNewCourse,
  deleteCourse, updateCourse }: {
  courses: Course[]; course: Course; setCourse: (course: Course) => void;
  addNewCourse: () => void; deleteCourse: (courseId: string) => void;
  updateCourse: () => void; }
) {
  const { currentUser } = useKanbasSelector(state => state.accountReducer);
  const { enrollments } = useKanbasSelector(state => state.enrollmentsReducer);

  const fetchEnrollments = async () => {
    try {
      const enrollments = await client.getEnrollments(currentUser?._id ?? "");
      dispatch(setEnrollments(enrollments));
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchEnrollments();
  }, [enrollments]);
  const isEnrolled = (course: Course) => {
    return enrollments.some((e) => e.course === course._id);
  }
  const dispatch = useKanbasDispatch();
  let [enrollmentSwitch, setEnrollmentSwitch] = useState(true);
  return (
    <div id="wd-dashboard">
      <div className="d-flex justify-content-between align-items-center" >
        <h1 id="wd-dashboard-title">
          Dashboard
        </h1>
        <ViewButton className="flex-end"/>
      </div>
      <hr />
      <RoleView role="FACULTY">
        <NewCourse addNewCourse={addNewCourse} updateCourse={updateCourse} setCourse={setCourse} course={course} />
      </RoleView>
      <RoleView role="STUDENT" loose>
        <button className="btn btn-primary float-end"
          onClick={() => setEnrollmentSwitch(!enrollmentSwitch)}> Enrollments </button>
      </RoleView>
      <h2 id="wd-dashboard-published">
        {currentUser && isFaculty(currentUser) ? "Published " : enrollmentSwitch ? "Enrolled " : "All "}
        Courses ({!enrollmentSwitch ? courses.length : courses.filter(isEnrolled).length})
        </h2> <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses
            .filter((course) => !enrollmentSwitch || isEnrolled(course))
            .map((course) => (
              <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                <div className="card rounded-3 overflow-hidden">
                  <Link to={`/Kanbas/Courses/${course._id}/Home`}
                        className="wd-dashboard-course-link text-decoration-none text-dark" >
                    <img src="/images/react.png" width="100%" height={160} />
                    <div className="card-body">
                      <h5 className="wd-dashboard-course-title card-title">
                        {course.name} </h5>
                      <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                        {course.description} </p>
                      <button className="btn btn-primary float-begin"> Go </button>
                      <RoleView role="FACULTY">
                        <button onClick={(event) => {
                            event.preventDefault();
                            deleteCourse(course._id);
                          }} className="btn btn-danger float-end"
                          id="wd-delete-course-click">
                          Delete
                        </button>
                        <button id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end" >
                          Edit
                        </button>
                      </RoleView>
                      <RoleView role="STUDENT" loose>
                        {!enrollmentSwitch && <button id="wd-enrollment-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            if (!currentUser) return;
                            const enrollment = enrollments.find((e) => e.course === course._id)
                                            ?? {
                                              course: course._id,
                                              user: currentUser._id,
                                              _id: new Date().getTime().toString()
                                            };
                          if (isEnrolled(course)) {
                            client.unenroll(currentUser._id, course._id);
                            dispatch(deleteEnrollment(enrollment));
                          } else {
                            client.enroll(currentUser._id, course._id);
                            dispatch(addEnrollment(enrollment));
                          }}}
                          className={`btn ${isEnrolled(course) ? "btn-danger" : "btn-success"} me-2 float-end`} >
                          {isEnrolled(course) ? "Unenroll" : "Enroll"}
                        </button>}
                      </RoleView>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>);}