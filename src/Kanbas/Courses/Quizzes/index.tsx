import { BsGripVertical, BsPlus } from "react-icons/bs";
import LessonControlButtons from "../Modules/LessonControlButtons";
// import ModulesControlButtons from "../Modules/ModulesControlButtons";
// import AssignmentContorls from "./AssignmentControls";
// import AssignmentIcon from "./AssignmentIcon";
import { TiArrowSortedDown } from "react-icons/ti";
import { Link } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import QuizIcon from "./QuizIcon";
import QuestionsEditor from "./QuestionsEditor";
import { FacultyView } from "../../Account/RoleShownContent";
import QuestionEditor from "./QuestionEditors";
// import AssignmentControlButtons from "./AssignmentControlButtons";

export default function Quizzes() {
  return (
    <div>
      <div>
        <div className="d-flex mb-1 align-items-center">
          <input id="wd-search-assignment"
            className="form-control me-5  border-secondary"
            placeholder="Search for Quiz" />
          <FacultyView>
            <button id="wd-add-quizzes" className="btn btn-danger d-flex flex-end me-2">
              <BsPlus className="fs-4" />
              Quiz
            </button>
          </FacultyView>
          <div className="dropdown d-flex me-1">
            <button id="wd-add-quizzes-group" className="btn btn-secondary" type="button" data-bs-toggle="dropdown">
              <IoEllipsisVertical className="fs-4" />
            </button>
            <ul className="dropdown-menu">
              <li className="dropdown-item"> Options </li>
              <li className="dropdown-item"> More Options </li>
            </ul>
          </div>
        </div>
        < hr />

        <ul id="wd-quizzes-list" className="list-group rounded-0">
          <li className="wd-quizzes-list list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-quizzess-title p-3 ps-2 bg-secondary ">

              <TiArrowSortedDown className="me-2" /><b> Assignment Quizzes</b>

            </div>

            <ul className="wd-quizzes-list-item list-group rounded-0">
              <li className="wd-quizzes-list-item list-group-item p-3 ps-1 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  <QuizIcon />
                  <div>
                    <a className="wd-quizzes-link list-group-item text-black border border-0 p-0 mb-0 fs-3"
                      href="#/Kanbas/Courses/1234/Quizzes/123">
                      <h4><b>Q1 - HTML</b></h4>
                    </a>
                    <p className="mb-0">
                      <b>Closed</b> | <b>Due</b> Sep 21 at 1pm | 29 pts | 11 Questions
                    </p>
                  </div>
                </div>
                <LessonControlButtons />
              </li>
              <li className="wd-quizzes-list-item list-group-item p-3 ps-1 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  <QuizIcon />
                  <div>
                    <a className="wd-quizzes-link list-group-item text-black border border-0 p-0 mb-0"
                      href="#/Kanbas/Courses/1234/Quizzes/123">
                      <h4><b>Q2 - CSS</b></h4>
                    </a>
                    <p className="mb-0">
                      <b>Closed</b> | <b>Due</b> Oct 5 at 1pm | 32 pts | 7 Questions
                    </p>
                  </div>
                </div>
                <LessonControlButtons />
              </li>
              <li className="wd-quizzes-list-item list-group-item p-3 ps-1 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  <QuizIcon />
                  <div>
                    <a className="wd-quizzes-link list-group-item text-black border border-0 p-0 mb-0"
                      href="#/Kanbas/Courses/1234/Quizzes/123">
                      <h4><b>EXAM 1 FA 23</b></h4>
                    </a>
                    <p className="mb-0">
                      <b>Closed</b> | <b>Due</b> Oct 26 at 5:30pm | 113 pts | 20 Questions
                    </p>
                  </div>
                </div>
                <LessonControlButtons />
              </li>
              <li className="wd-quizzes-list-item list-group-item p-3 ps-1 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  <QuizIcon />
                  <div>
                    <a className="wd-quizzes-link list-group-item text-black border border-0 p-0 mb-0"
                      href="#/Kanbas/Courses/1234/Quizzes/123">
                      <h4><b>Q3 - JS, ES6</b></h4>
                    </a>
                    <p className="mb-0 ">
                      Available <span className="text-danger">Multiple dates</span> | Due <span className="text-danger">Multiple dates</span> | 38 pts | 13 Questions
                    </p>
                  </div>
                </div>
                <LessonControlButtons />
              </li>
              <li className="wd-quizzes-list-item list-group-item p-3 ps-1 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  <QuizIcon />
                  <div>
                    <a className="wd-quizzes-link list-group-item text-black border border-0 p-0 mb-0"
                      href="#/Kanbas/Courses/1234/Quizzes/123">
                      <h4><b>Q3</b></h4>
                    </a>
                    <p className="mb-0 ">
                      Available <span className="text-danger">Multiple dates</span> | Due <span className="text-danger">Multiple dates</span> | 31 pts | 8 Questions
                    </p>
                  </div>
                </div>
                <LessonControlButtons />
              </li>
              <li className="wd-quizzes-list-item list-group-item p-3 ps-1 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  <QuizIcon />
                  <div>
                    <a className="wd-quizzes-link list-group-item text-black border border-0 p-0 mb-0"
                      href="#/Kanbas/Courses/1234/Quizzes/123">
                      <h4><b>Q4 - NODE</b></h4>
                    </a>
                    <p className="mb-0">
                      <b>Closed</b> | <b>Due</b> Nov 20 at 3pm | 25 pts | 4 Questions
                    </p>
                  </div>
                </div>
                <LessonControlButtons />
              </li>
              <li className="wd-quizzes-list-item list-group-item p-3 ps-1 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  <QuizIcon />
                  <div>
                    <a className="wd-quizzes-link list-group-item text-black border border-0 p-0 mb-0"
                      href="#/Kanbas/Courses/1234/Quizzes/123">
                      <h4><b>Q5 - MONGO</b></h4>
                    </a>
                    <p className="mb-0">
                      <b>Not available until</b> Nov 30 at 11:40am | <b>Due</b> Nov 30 at 1pm | 38 pts | 10 Questions
                    </p>
                  </div>
                </div>
                <LessonControlButtons />
              </li>
              <li className="wd-quizzes-list-item list-group-item p-3 ps-1 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  <QuizIcon />
                  <div>
                    <a className="wd-quizzes-link list-group-item text-black border border-0 p-0 mb-0"
                      href="#/Kanbas/Courses/1234/Quizzes/123">
                      <h4><b>EXAM 2 FA23</b></h4>
                    </a>
                    <p className="mb-0">
                      <b>Not available until</b> Dec 15 at 10:30am | <b>Due</b> Dec 15 at 1pm | 104 pts | 18 Questions
                    </p>
                  </div>
                </div>
                <LessonControlButtons />
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <QuestionEditor />
    </div>
  );
}
