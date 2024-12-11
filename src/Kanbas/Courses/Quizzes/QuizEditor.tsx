import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router";
import DetailsEditor from "./DetailsEditor";
import { addQuiz, AssignmentGroup, isQuiz, Quiz, QuizType, updateQuiz } from "./quizzesReducer";
import QuestionsEditor from "./QuestionsEditor";
import { useKanbasSelector } from "../../../hooks";
import * as coursesClient from "../client"
import * as quizClient from "./client"

// This is the screen that has the tabs and renders details editor or questions editor
export default function QuizEditor() {
  const { qid, cid } = useParams(); // quiz ID 
  const { pathname } = useLocation();
  const [quiz, setQuiz] = useState<Quiz | null>(null); // State
  const { quizzes } = useKanbasSelector(s => s.quizzesReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCancelQuiz = () => {
    if (pathname.includes('new-quiz')) {
      navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    }
    else {
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`);
    }
  }

  const handleSaveQuiz = async () => {
    if (!quiz || !cid) return;
    if (pathname.includes('new-quiz')) {
        console.log(`Creating: ${JSON.stringify(quiz)}`)
        const newQuiz = await coursesClient.createQuizForCourse(cid, quiz);
        if (newQuiz) {
          dispatch(addQuiz(newQuiz));
        }
    } else {
        console.log(`Updating: ${JSON.stringify(quiz)}`)
        await quizClient.updateQuiz(quiz);
        dispatch(updateQuiz(quiz));
    }
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  }


  useEffect(() => {
    if (!cid) return;
    if (pathname.includes("new-quiz")) {
      setQuiz({
        _id: "-1",
        title: "new quiz",
        course: cid,
        description: "",
        type: QuizType.GRADED,
        group: AssignmentGroup.QUIZZES,
        shuffleAnswers: false,
        timeLimitEnabled: false,
        timeLimit: 20,
        attempts: 1,
        assignTo: "Everyone",
        due: new Date().toISOString(),
        availableFrom: new Date().toISOString(),
        availableUntil: new Date().toISOString(),
        questions: [],
        published: false,
        points: 0
      });
    } else {
        const fetchedQuiz = quizzes.find(q => q._id === qid);
        if (fetchedQuiz) {
          setQuiz(fetchedQuiz);
        }
    }
  }, [pathname]);

    return quiz && (
        <div>
            <ul className="nav nav-tabs" id="quizTab" role="tablist">
                <li className="nav-item" role="details">
                    {/* TODO style this with correct color*/}
                    <button className="nav-link active fs-4" id="details-tab" data-bs-toggle="tab" data-bs-target="#details"
                            type="button" role="tab" aria-controls="details" aria-selected="true">
                        Details
                    </button>
                </li>
                <li className="nav-item fs-4" role="questions">
                    {/* TODO style this with correct color*/}
                    <button className="nav-link" id="questions-tab" data-bs-toggle="tab" data-bs-target="#questions"
                            type="button" role="tab" aria-controls="questions" aria-selected="false">
                        Questions
                    </button>
                </li>
            </ul>
            <div className="tab-content">
                <div className="tab-pane fade show active" id="details" role="tabpanel" aria-labelledby="details-tab">
                    <DetailsEditor quiz={quiz} setQuiz={setQuiz}/>
                </div>
                <div className="tab-pane fade" id="questions" role="tabpanel" aria-labelledby="questions-tab">
                    <QuestionsEditor quiz={quiz} setQuiz={setQuiz}/>
                </div>
            </div>
            <hr className="mt-4 mb-3" />
            <div className="d-flex justify-content-center">
                <button type="button" className="btn btn-secondary me-3" onClick={handleCancelQuiz}>
                Cancel
                </button>
                <button type="submit" className="btn btn-danger" onClick={handleSaveQuiz}>
                Save
                </button>
            </div>
            <hr className="mt-3" />
        </div>
    )
}