import { Link } from "react-router-dom";
import { useKanbasSelector } from "../hooks";
import { Course } from ".";
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

export default function Dashboard(
{ courses, course, setCourse, addNewCourse,
  deleteCourse, updateCourse, enrolling, setEnrolling, updateEnrollment }: {
  courses: Course[]; course: Course; setCourse: (course: Course) => void;
  addNewCourse: () => void; deleteCourse: (courseId: string) => void;
  updateCourse: () => void; enrolling: boolean, setEnrolling: (enrolling: boolean) => void
  updateEnrollment: (courseId: string, enrolled: boolean) => void}) {
  const { currentUser } = useKanbasSelector(state => state.accountReducer);
  const { currentView } = useKanbasSelector(state => state.viewReducer);

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
      <button className="btn btn-primary float-end"
        onClick={() => setEnrolling(!enrolling)}> {enrolling ? "My Courses" : "All Courses"} </button>
      <h2 id="wd-dashboard-published">
        {currentUser && (!enrolling ? currentView === "FACULTY" ? "Published " : "Enrolled " : "All ")}
        Courses ({courses.length})
        </h2> <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses
            .map((course) => (
              <div key={course._id} className="wd-dashboard-course col" style={{ width: "300px" }}>
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
                        {!enrolling && <button onClick={(event) => {
                            event.preventDefault();
                            deleteCourse(course._id);
                          }} className="btn btn-danger float-end"
                          id="wd-delete-course-click">
                          Delete
                        </button>}
                        {!enrolling && <button id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end" >
                          Edit
                        </button>}
                      </RoleView>
                      {enrolling && <button id="wd-enrollment-course-click"
                        onClick={(event) => {
                          event.preventDefault();
                          updateEnrollment(course._id, !course.enrolled)}}
                        className={`btn ${course.enrolled ? "btn-danger" : "btn-success"} me-2 float-end`} >
                        {course.enrolled ? "Unenroll" : "Enroll"}
                      </button>}
                    </div>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>);}