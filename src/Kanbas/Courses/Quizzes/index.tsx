import { BsGripVertical, BsPlus } from "react-icons/bs";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { TiArrowSortedDown } from "react-icons/ti";
import { Link, useParams } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import QuizIcon from "./QuizIcon";
import { MdUnpublished } from "react-icons/md";
import { IoCheckmarkCircle } from "react-icons/io5";
import QuestionsEditor from "./QuestionsEditor";
import { FacultyView } from "../../Account/RoleShownContent";
import QuestionEditor from "./QuestionEditors";
import { useState } from "react";
import GreenCheckmark from "../Modules/GreenCheckmark";
// import AssignmentControlButtons from "./AssignmentControlButtons";

export default function Quizzes() {
  const { cid } = useParams();




  const [quizzes, setQuizzes] = useState([
    { id: "123", title: "Q1 - HTML", status: "Closed", due: "Sep 21 at 1pm", points: 29, questions: 11, publish: false },
    { id: "124", title: "Q2 - CSS", status: "Closed", due: "Oct 5 at 1pm", points: 32, questions: 7, publish: false },
  ]);

  const togglePublish = (id: string) => {
    setQuizzes(prevQuizzes =>
      prevQuizzes.map(quiz =>
        quiz.id === id ? { ...quiz, publish: !quiz.publish } : quiz
      )
    );
  };



  return (
    <div>
      <div>
        <div className="d-flex mb-1 align-items-center">
          <input id="wd-search-assignment"
            className="form-control me-5 border-secondary"
            placeholder="Search for Quiz" />
          <FacultyView>
            <Link className="wd-quizzes-link list-group-item text-black border border-0 p-0 mb-0 fs-3"
              to={`/Kanbas/Courses/${cid}/Quizzes/new-quiz/edit`}>
              <button id="wd-add-quizzes" className="btn btn-danger d-flex flex-end me-2">
                <BsPlus className="fs-4" />
                Quiz
              </button>
            </Link>
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
                  <div className="float-end">
                    <div className="d-flex">
                      {quiz.publish === false ? (
                        <button onClick={() => togglePublish(quiz.id)}> <MdUnpublished className="text-danger" /> </button>
                      ) : (
                        <button onClick={() => togglePublish(quiz.id)}> <GreenCheckmark /> </button>
                      )}
                      <div className="dropdown ms-2">
                        <button type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                          <IoEllipsisVertical className="fs-4" />
                        </button>
                        <form className="dropdown-menu p-4">
                          <button className="btn btn-primary mb-3">Edit</button>
                          <button className="btn btn-primary mb-3">Delete</button>
                          <button className="btn btn-primary mb-3">Publish</button>
                        </form>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
      <QuestionEditor />

    </div>

  );
}
