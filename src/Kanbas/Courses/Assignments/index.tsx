import { BsGripVertical, BsPlus } from "react-icons/bs";
import "../../styles.css";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdArrowDropDown, MdEditDocument } from "react-icons/md";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";

type Assignment = {
  name : string,
  stday : string,
  sttime : string,
  dueday : string,
  duetime : string,
  pts : number,
}

function Assignment(prop :Assignment) {
  return (
    <div className="d-flex align-items-center">
      <BsGripVertical className="fs-4 me-2"/>
      <MdEditDocument className="fs-4 me-2"/>
      <div className="flex-begin flex-fill">
        <a className="wd-assignment-link text-decoration-none text-dark fs-5 fw-bold"
          href="#/Kanbas/Courses/1234/Assignments/123">
        {prop.name} 
        </a>
        <br />
        <span className="text-danger"> Multiple Modules </span> | <strong> Not available until </strong> {prop.stday} at {prop.sttime} |
        <br/>
        <strong> Due </strong> {prop.dueday} at {prop.duetime} | {prop.pts}pts
      </div>
      <div className="flex-end">
        <GreenCheckmark />
        <IoEllipsisVertical className="fs-4 ms-4" />
      </div>
    </div>
  );
}

export default function Assignments() {
  return (
    <div id="wd-assignments" className="ms-1">
      <div className="d-flex mb-1 align-items-center">
        <FaMagnifyingGlass className="position-fixed fs-4 ms-2"/>
        <input id="wd-search-assignment"
              className="form-control me-5 px-5 border-secondary"
              placeholder="Search..." />
        <button id="wd-add-assignment-group" className="btn btn-secondary d-flex me-1">
          <BsPlus className="fs-4" />
          Group
        </button>
        <button id="wd-add-assignment" className="btn btn-danger d-flex flex-end">
          <BsPlus className="fs-4" />
          Assignment
        </button>
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
          <button className="btn">
            <BsPlus className="fs-4" />
          </button>
          <IoEllipsisVertical className="fs-4" />
        </div>
      </div>
      <ul id="wd-assignment-list" className="list-group rounded-0">
        <li className="wd-assignment-list-item list-group-item p-3 ps-1">
	        <Assignment name="A1 - ENV + HTML" stday="May 6" sttime="12:00am" dueday="May 13" duetime="11:59pm" pts={100} />
        </li>
        <li className="wd-assignment-list-item list-group-item p-3 ps-1">
      	  <Assignment name="A2 - CSS + BOOTSTRAP" stday="May 13" sttime="12:00am" dueday="May 20" duetime="11:59pm" pts={100} />
        </li>
        <li className="wd-assignment-list-item list-group-item p-3 ps-1">
      	  <Assignment name="A3 - JAVASCRIPT + REACT" stday="May 20" sttime="12:00am" dueday="May 27" duetime="11:59pm" pts={100} />
        </li>
      </ul>
    </div>
);}
