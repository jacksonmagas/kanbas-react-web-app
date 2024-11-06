import { useLocation, useParams } from "react-router";
import { addAssignment, editAssignment, updateAssignment, deleteAssignment, Assignment } from "./reducer";
import { useDispatch, useSelector } from "react-redux";

const dateObjectToHtmlDateString = (date: Date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? 0 : ""}${
      date.getMonth() + 1
    }-${date.getDate() + 1 < 10 ? 0 : ""}${date.getDate() + 1}`;
  };


export default function AssignmentEditor() {
  const { pathname } = useLocation();
  const { cid, aid } = useParams();
  let assignment : Assignment = useSelector((state: any) => state.assignmentsReducer).assignments.find((a :Assignment) => a._id === aid);
  const dispatch = useDispatch();
  if (!cid) {
    return (
      <div>
        Error no course ID
      </div>)
  }
  if (pathname.includes("new-assignment")) {
    assignment = {
      _id: "",
      course: cid,
      name: "assignment name here",
      description: "assignment description here",
      stday: dateObjectToHtmlDateString(new Date()),
      sttime: "12:00 am",
      dueday: dateObjectToHtmlDateString(new Date()),
      duetime: "11:59pm",
      endday: dateObjectToHtmlDateString(new Date()),
      endtime: "11:59pm",
      pts: 100
    };
  } else {
  }
  return (
    <div id="wd-assignments-editor"> 
      <div className="ms-1 row form-group g-4">
        <label htmlFor="wd-name">Assignment Name</label>
        <input id="wd-name" className="form-control border-secondary g-2" defaultValue={assignment.name}
          onChange={(e) => {assignment = { ...assignment, name:  e.target.value }}}/>
        <textarea id="wd-description" className="form-control border-secondary"
          onChange={(e) => {assignment = { ...assignment, description:  e.target.value }}}>
          {assignment.description}
        </textarea>
        <label htmlFor="wd-points " className="col-4 col-form-label text-end">Points</label>
        <div className="col-8">
          <input id="wd-points" type="number" className="form-control border-secondary" defaultValue={assignment.pts} 
            onChange={(e) => {assignment = { ...assignment, pts: parseInt(e.target.value)}}}/>
        </div>
        <label htmlFor="wd-group" className="col-4 col-form-label text-end">Assignment Group </label>
        <div className="col-8">
          <select id="wd-group" className="form-control form-select border-secondary">
            <option> ASSIGNMENTS </option>
            <option> EXAMS </option>
            <option> PROJECTS </option>
          </select>
        </div>
        <label htmlFor="wd-display-grade-as" className="col-4 col-form-label text-end">Display Grade as </label>
        <div className="col-8">
          <select id="wd-display-grade-as" className="form-control form-select border-secondary">
            <option> Percentage </option>
            <option> Points </option>
          </select>
        </div>
        <label htmlFor="wd-submission-type" className="col-4 col-form-label text-end"> Submission Type </label>
        <div className="col-8">
          <select id="wd-submission-type" className="form-control form-select border-secondary">
            <option> Online </option>
            <option> Offline </option>
          </select>
        </div>
        <div className="col-4"/>
        <div className="col-8 fw-bold">
          Online Entry Options
        </div>
        <div className="col-4"/>
        <div className="col-8">
          <input type="checkbox" id="wd-text-entry" name="entry-options" value="Text Entry" className="form-check-input border-secondary me-2"/>
          <label htmlFor="wd-text-entry"> Text Entry </label>
        </div>
        <div className="col-4"/>
        <div className="col-8">
          <input type="checkbox" id="wd-website-url" name="entry-options" value="Website Url" className="form-check-input border-secondary me-2"/>
          <label htmlFor="wd-website-url"> Website Url </label>
        </div>
        <div className="col-4"/>
        <div className="col-8">
          <input type="checkbox" id="wd-media-recordings" name="entry-options" value="Media Recordings" className="form-check-input border-secondary me-2"/>
          <label htmlFor="wd-media-recordings"> Media Recordings </label>
        </div>
        <div className="col-4"/>
        <div className="col-8">
          <input type="checkbox" id="wd-student-annotation" name="entry-options" value="Student Annotation" className="form-check-input border-secondary me-2"/>
          <label htmlFor="wd-student-annotation"> Student Annotation </label>
        </div>
        <div className="col-4"/>
        <div className="col-8">
          <input type="checkbox" id="wd-student-annotation" name="entry-options" value="File Uploads" className="form-check-input border-secondary me-2"/>
          <label htmlFor="wd-student-annotation"> File Uploads </label>
        </div>
        <hr/>
        <div className="col-4 text-end">
          Assign
        </div>
        <div className="col-8">
          <label htmlFor="wd-assign-to" className="fw-bold mb-2"> Assign to </label>
          <input type="text" id="wd-assign-to" value="Everyone" className="form-control border-secondary mb-4"/>
          <label htmlFor="wd-due-date" className="fw-bold mb-2" defaultValue={assignment.dueday}> Due </label>
          <input type="date" id="wd-due-date" className="form-control border-secondary mb-4" defaultValue={assignment.dueday}
            onChange={(e) => {assignment = {...assignment, dueday: e.target.value}}}/>
          <div className="d-flex">
            <div className="flex-fill me-2">
              <label htmlFor="wd-available-from" className="fw-bold mb-2"> Available from </label>
              <input type="date" id="wd-available-from" className="form-control border-secondary" defaultValue={assignment.stday}
                onChange={(e) => {assignment = {...assignment, stday: e.target.value}}}/>
            </div>
            <div className="flex-fill">
              <label htmlFor="wd-available-until" className="fw-bold mb-2"> Until </label>
              <input type="date" id="wd-available-until" className="form-control border-secondary" defaultValue={assignment.endday}
                onChange={(e) => {assignment = {...assignment, endday: e.target.value}}}/>
            </div>
          </div>
        </div>
        <hr/>
      </div>
      <div className="float-end mt-4">
        <button className="btn btn-secondary border-secondary me-2">
          Cancel
        </button>
        <a href={`#/Kanbas/Courses/${cid}/Assignments`} className="text-decoration-none">
        <button className="btn btn-danger border-danger"
                onClick={() => dispatch(pathname.includes("new-assignment") ? addAssignment(assignment) : updateAssignment(assignment))}>
          Save
        </button></a>
      </div>
    </div>
  );
}
