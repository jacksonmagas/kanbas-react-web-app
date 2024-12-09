import { BsGripVertical, BsPlus } from "react-icons/bs";
import { TiArrowSortedDown } from "react-icons/ti";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoEllipsisVertical } from "react-icons/io5";
import QuizIcon from "./QuizIcon";
import { MdUnpublished } from "react-icons/md";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { useKanbasDispatch, useKanbasSelector } from "../../../hooks";
import { setQuizzes, updateQuiz } from "./quizzesReducer";
import * as coursesClient from "../client"
import * as quizClient from "./client"
import { useEffect } from "react";

export default function Quizzes() {
  const { cid } = useParams();
  const { quizzes } = useKanbasSelector(state => state.quizzesReducer); 
  const dispatch = useKanbasDispatch();
  const navigate = useNavigate();

  const fetchQuizzes = async () => {
    if (!cid) return;
    const quizzes = await coursesClient.findQuizzesForCourse(cid);
    if (quizzes) {
      dispatch(setQuizzes(quizzes));
    }
  }

  const togglePublish = async (id: string) => {
    let quiz = quizzes.find(q => q._id === id);
    if (quiz) {
      quiz = {...quiz, published: !quiz.published};
      await quizClient.updateQuiz(quiz);
      dispatch(updateQuiz(quiz));
    }
  };

  const deleteQuiz = async (id: string) => {
    await quizClient.deleteQuiz(id)
  }

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <div>
      <div>
        <div className="d-flex mb-1 align-items-center">
          <input id="wd-search-assignment"
            className="form-control me-5 border-secondary"
            placeholder="Search for Quiz" />
          <Link className="wd-quizzes-link list-group-item text-black border border-0 p-0 mb-0 fs-3"
            to={`/Kanbas/Courses/${cid}/Quizzes/new-quiz/edit`}>
            <button id="wd-add-quizzes" className="btn btn-danger d-flex flex-end me-2">
              <BsPlus className="fs-4" />
              Quiz
            </button>
          </Link>
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
            <div className="wd-quizzess-title p-3 ps-2 bg-secondary ">
              <TiArrowSortedDown className="me-2" /><b> Assignment Quizzes</b>
            </div>
            <ul className="wd-quizzes-list-item list-group rounded-0">
              {quizzes.map(quiz => (
                <li key={quiz._id} className="wd-quizzes-list-item list-group-item p-3 ps-1 d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <BsGripVertical className="me-2 fs-3" />
                    <QuizIcon />
                    <div>
                      <Link className="wd-quizzes-link list-group-item text-black border border-0 p-0 mb-0 fs-3"
                        to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`}>
                        <h4><b>{quiz.title}</b></h4>
                      </Link>
                      <p className="mb-0">
                        <b>{/*quiz.status*/}</b> | <b>Due</b> {new Date(quiz.due).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric"})}
                        | {quiz.points} pts | {quiz.questions.length} Questions
                      </p>
                    </div>
                  </div>
                  <div className="float-end">
                    <div className="d-flex">
                      <button onClick={() => togglePublish(quiz._id)}>
                        {quiz.published === false 
                          ? <MdUnpublished className="text-danger" />
                          : <GreenCheckmark />}
                      </button>
                      <div className="dropdown ms-2">
                        <button type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                          <IoEllipsisVertical className="fs-4" />
                        </button>
                        <form className="dropdown-menu p-4">
                          <button className="btn btn-primary mb-3" onClick={() => navigate(`${quiz._id}/edit`)}>Edit</button>
                          <button className="btn btn-primary mb-3" onClick={() => deleteQuiz(quiz._id)}>Delete</button>
                          <button className="btn btn-primary mb-3" onClick={() => togglePublish(quiz._id)}>Publish</button>
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
    </div>
  );
}
