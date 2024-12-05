import { BsGripVertical, BsPlus } from "react-icons/bs";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { TiArrowSortedDown } from "react-icons/ti";
import { Link, useParams } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import QuizIcon from "./QuizIcon";



export default function Quizzes() {
  const { cid } = useParams();
  const quizzes = [
    { id: "123", title: "Q1 - HTML", status: "Closed", due: "Sep 21 at 1pm", points: 29, questions: 11 },
    { id: "124", title: "Q2 - CSS", status: "Closed", due: "Oct 5 at 1pm", points: 32, questions: 7 },
    // Add more quizzes as needed
  ];

  return (
    <div>
      <div>
        <div className="d-flex mb-1 align-items-center">
          <input id="wd-search-assignment"
            className="form-control me-5 border-secondary"
            placeholder="Search for Quiz" />
          <button id="wd-add-quizzes" className="btn btn-danger d-flex flex-end me-2">
            <BsPlus className="fs-4" />
            Quiz
          </button>
          <button id="wd-add-quizzes-group" className="btn btn-secondary d-flex me-1">
            <IoEllipsisVertical className="fs-4" />
          </button>
        </div>
        <hr />

        <ul id="wd-quizzes-list" className="list-group rounded-0">
          <li className="wd-quizzes-list list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-quizzess-title p-3 ps-2 bg-secondary">
              <TiArrowSortedDown className="me-2" /><b> Assignment Quizzes</b>
            </div>

            <ul className="wd-quizzes-list-item list-group rounded-0">
              {quizzes.map(quiz => (
                <li key={quiz.id} className="wd-quizzes-list-item list-group-item p-3 ps-1 d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <BsGripVertical className="me-2 fs-3" />
                    <QuizIcon />
                    <div>
                      <Link className="wd-quizzes-link list-group-item text-black border border-0 p-0 mb-0 fs-3"
                        to={`/Kanbas/Courses/${cid}/Quizzes/${quiz.id}`}>
                        <h4><b>{quiz.title}</b></h4>
                      </Link>
                      <p className="mb-0">
                        <b>{quiz.status}</b> | <b>Due</b> {quiz.due} | {quiz.points} pts | {quiz.questions} Questions
                      </p>
                    </div>
                  </div>
                  <LessonControlButtons />
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
