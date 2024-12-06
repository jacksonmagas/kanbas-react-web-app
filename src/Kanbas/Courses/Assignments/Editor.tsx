import { useLocation, useParams } from "react-router";
import { addAssignment, editAssignment, updateAssignment, deleteAssignment, Assignment } from "./reducer";
import * as assignmentClient from "./client"
import * as coursesClient from "../client"
import { useKanbasDispatch, useKanbasSelector } from "../../../hooks";
import { useState } from "react";

async function saveAssignment(assignment: Assignment, cid: string, dispatch: any, pathname: string) {
  if (pathname.includes("new-assignment")) {
    await coursesClient.createAssignmentForCourse(cid ?? "", assignment)
    dispatch(addAssignment(assignment))
  } else {
    await assignmentClient.updateAssignment(assignment)
    dispatch(updateAssignment(assignment));
  }
}

export default function AssignmentEditor() {
  const { pathname } = useLocation();
  const { cid, aid } = useParams();
  const dispatch = useKanbasDispatch();
  const [assignment, setAssignment] = useState(useKanbasSelector(state => state.assignmentsReducer)
    .assignments.find(a => a._id === aid));
  if (!cid) {
    return (
      <div>
        Error no course ID
      </div>)
  }
  if (pathname.includes("new-assignment")) {
    setAssignment({
      _id: "",
      course: cid,
      name: "assignment name here",
      description: "assignment description here",
      sttime: new Date().toISOString(),
      duetime: new Date().toISOString(),
      endtime: new Date().toISOString(),
      pts: 100
    });
  } else {
  }
  return assignment && (
    <div id="wd-assignments-editor"> 
      <div className="ms-1 row form-group g-4">
        <label htmlFor="wd-name">Assignment Name</label>
        <input id="wd-name" className="form-control border-secondary g-2" defaultValue={assignment.name}
          onChange={(e) => {setAssignment({ ...assignment, name:  e.target.value })}}/>
        <textarea id="wd-description" className="form-control border-secondary"
          onChange={(e) => {setAssignment({ ...assignment, description:  e.target.value })}}>
          {assignment.description}
        </textarea>
        <label htmlFor="wd-points " className="col-4 col-form-label text-end">Points</label>
        <div className="col-8">
          <input id="wd-points" type="number" className="form-control border-secondary" defaultValue={assignment.pts} 
            onChange={(e) => {setAssignment({ ...assignment, pts: parseInt(e.target.value)})}}/>
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
          <label htmlFor="wd-due-date" className="fw-bold mb-2" defaultValue={assignment.duetime}> Due </label>
          <input type="date" id="wd-due-date" className="form-control border-secondary mb-4" defaultValue={assignment.duetime}
            onChange={(e) => {setAssignment({...assignment, duetime: e.target.value})}}/>
          <div className="d-flex">
            <div className="flex-fill me-2">
              <label htmlFor="wd-available-from" className="fw-bold mb-2"> Available from </label>
              <input type="date" id="wd-available-from" className="form-control border-secondary" defaultValue={assignment.sttime}
                onChange={(e) => {setAssignment({...assignment, sttime: e.target.value})}}/>
            </div>
            <div className="flex-fill">
              <label htmlFor="wd-available-until" className="fw-bold mb-2"> Until </label>
              <input type="date" id="wd-available-until" className="form-control border-secondary" defaultValue={assignment.endtime}
                onChange={(e) => {setAssignment({...assignment, endtime: e.target.value})}}/>
            </div>
          </div>
        </div>
        <hr/>
      </div>
      <div className="float-end mt-4">
        <a href={`#/Kanbas/Courses/${cid}/Assignments`} className="text-decoration-none">
        <button className="btn btn-secondary border-secondary me-2">
          Cancel
        </button>
        <button className="btn btn-danger border-danger"
                onClick={() => saveAssignment(assignment, cid, dispatch, pathname)}>
          Save
        </button></a>
      </div>
    </div>
  );
}
