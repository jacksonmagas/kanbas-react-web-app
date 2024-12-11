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
import { RoleView } from "../../Account/RoleShownContent";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function Quizzes() {
  const { cid } = useParams();
  const { quizzes } = useKanbasSelector(state => state.quizzesReducer); 
  const { currentView } = useKanbasSelector(s => s.viewReducer);
  const dispatch = useKanbasDispatch();
  const navigate = useNavigate();

  const fetchQuizzes = async (search?: string) => {
    if (!cid || !currentView) return;
    const base = search ? {courseId: cid, search: search} : {courseId: cid};
    const quizzes = currentView === "STUDENT"
      ? await coursesClient.findQuizzesForCourse({...base, published: true})
      : await coursesClient.findQuizzesForCourse(base);
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
  }, [currentView]);

  return (
    <div className="ms-1">
      <div>
        <div className="d-flex mb-1 align-items-center">
          <FaMagnifyingGlass className="position-absolute fs-4 ms-2"/>
          <input id="wd-search-assignment"
                className="form-control me-5 px-5 border-secondary"
                placeholder="Search..."
                onChange={e => fetchQuizzes(e.target.value)}/>
          <RoleView role="FACULTY">
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
          </RoleView>
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
                    <RoleView role="FACULTY">
                      <BsGripVertical className="me-2 fs-3" />
                    </RoleView>
                    <RoleView role="STUDENT" loose>
                      <div className="me-2"/>
                    </RoleView>
                    <QuizIcon />
                    <div>
                      <Link className="wd-quizzes-link list-group-item text-black border border-0 p-0 mb-0 fs-3"
                        to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`}>
                        <h4><b>{quiz.title}</b></h4>
                      </Link>
                      <RoleView role="FACULTY">
                        <p className="mb-0">
                          <b>{quiz.published ? "Published" : "Unpublished"}</b> | <b>Due</b> {`${new Date(quiz.due).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric"})}
                          | ${quiz.points} pts | ${quiz.questions.length} ${quiz.questions.length == 1 ? "Question" : "Questions"}`}
                        </p>
                      </RoleView>
                      <RoleView role="STUDENT" loose>
                        <p className="mb-0">
                          <b>{"Not Started"}</b> | <b>Due</b> {`${new Date(quiz.due).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric"})}
                          | ${quiz.points} pts | ${quiz.questions.length} ${quiz.questions.length == 1 ? "Question" : "Questions"}`}
                        </p>
                      </RoleView>
                    </div>
                  </div>
                  <div className="float-end">
                    <RoleView role="FACULTY">
                      <div className="d-flex">
                        <button className="btn"
                          onClick={() => togglePublish(quiz._id)}>
                          {quiz.published === false 
                            ? <MdUnpublished className="text-danger fs-4" />
                            : <GreenCheckmark />}
                        </button>
                        <div className="dropdown ms-2">
                          <button type="button" data-bs-toggle="dropdown" aria-expanded="false" className="btn">
                            <IoEllipsisVertical className="fs-4" />
                          </button>
                          <form className="dropdown-menu p-4">
                            <button className="dropdown-item mb-3" onClick={() => navigate(`${quiz._id}/edit`)}>Edit</button>
                            <button className="dropdown-item mb-3" onClick={() => deleteQuiz(quiz._id)}>Delete</button>
                            <button className="dropdown-item mb-3" onClick={() => togglePublish(quiz._id)}>Publish</button>
                          </form>
                        </div>
                      </div>
                    </RoleView>
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
