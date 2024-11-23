import { BsGripVertical, BsPlus } from "react-icons/bs";
import "../../styles.css";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdArrowDropDown, MdEditDocument } from "react-icons/md";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { useSelector, useDispatch } from "react-redux";
import type { Assignment } from "./reducer";
import { useParams } from "react-router";
import * as coursesClient from "../client";
import { useEffect } from "react";
import { setAssignments, deleteAssignment } from "./reducer";
import { BiTrash } from "react-icons/bi";
import * as assignmentClient from "./client"


export default function Assignments() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser.role === "FACULTY";
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const dispatch = useDispatch();
  const typedAssignments = assignments as Assignment[];
  const { cid } = useParams();
  const fetchAssignments = async () => {
    const assignments = await coursesClient.findAssignmentsForCourse(cid ?? "");
    dispatch(setAssignments(assignments));
  }

  const removeAssignment = async (assignment: Assignment) => {
    assignmentClient.deleteAssignment(assignment)
    dispatch(deleteAssignment(assignment._id))
  }

  useEffect(() => {
    fetchAssignments();
  }, []);

  function AssignmentPanel(assignment :Assignment) {
    const {_id, course, name, stday, sttime, dueday, duetime, pts} = assignment;
    return (
      <div className="d-flex align-items-center">
        <BsGripVertical className="fs-4 me-2"/>
        <MdEditDocument className="fs-4 me-2"/>
        <div className="flex-begin flex-fill">
          <a className="wd-assignment-link text-decoration-none text-dark fs-5 fw-bold"
            href={`#/Kanbas/Courses/${course}/Assignments/${_id}`}>
          {name} 
          </a>
          <br />
          <span className="text-danger"> Multiple Modules </span> | <strong> Not available until </strong>
          {new Date(stday + "T00:00").toLocaleDateString("en-US", { month: "long", day: "numeric" }) + " at " + sttime} |
          <br/>
          <strong> Due </strong>
          {new Date(dueday + "T00:00").toLocaleDateString("en-US", { month: "long", day: "numeric" }) + " at " + duetime} | {pts}pts
        </div>
        <div className="flex-end">
          <BiTrash className="fs-4 me-2" onClick={() => removeAssignment(assignment)}/>
          <GreenCheckmark />
          <IoEllipsisVertical className="fs-4 ms-4" />
        </div>
      </div>
    );
  }

  return (
    <div id="wd-assignments" className="ms-1">
      <div className="d-flex mb-1 align-items-center">
        <FaMagnifyingGlass className="position-fixed fs-4 ms-2"/>
        <input id="wd-search-assignment"
              className="form-control me-5 px-5 border-secondary"
              placeholder="Search..." />
        {isFaculty && <button id="wd-add-assignment-group" className="btn btn-secondary d-flex me-1">
          <BsPlus className="fs-4" />
          Group
        </button>}
        {isFaculty && <a href={`#/Kanbas/Courses/${cid}/Assignments/new-assignment`} className="text-decoration-none">
          <button id="wd-add-assignment" className="btn btn-danger d-flex flex-end">
          <BsPlus className="fs-4" />
          Assignment
        </button></a>}
      </div>
      <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center rounded-0">
        <div className="flex-begin">
          <BsGripVertical className="me-1 fs-4" />
          <MdArrowDropDown className="me-2 fs-4" />
        </div>
        <div className="flex-begin flex-fill fs-4 fw-bold">
          ASSIGNMENTS
        </div>
        <div className="flex-end flex">
          <span className="border border-dark rounded-pill px-2 py-2">40% of Total</span>
          {isFaculty && <button className="btn">
            <BsPlus className="fs-4" />
          </button>}
          <IoEllipsisVertical className="fs-4" />
        </div>
      </div>
      <ul id="wd-assignment-list" className="list-group rounded-0">
        {typedAssignments
          .filter((a) => a.course === cid)
          .map((a) => (<li className="wd-assignment-list-item list-group-item p-3 ps-1">
            <AssignmentPanel {...a}/>
          </li>))}
      </ul>
    </div>
);}
