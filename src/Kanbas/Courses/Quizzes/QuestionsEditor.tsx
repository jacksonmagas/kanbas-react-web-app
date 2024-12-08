import { Quiz } from "./quizzesReducer";
import { BsPlus } from "react-icons/bs";
import { useState } from "react";
import QuestionEditor, { QuestionType, QuizQuestion } from "./QuestionEditors";

export default function QuestionsEditor({ quiz, setQuiz } : {quiz : Quiz, setQuiz : (quiz: Quiz) => void}) {
    const [editing, setEditing] = useState(false);
    const [question, setQuestion] = useState<QuizQuestion | null>(null);

    const newQuestion = () => {
        setQuestion({
            _id: new Date().toString(),
            title: "",
            pts: 4,
            type: QuestionType.TRUE_FALSE,
            question: "",
            answer: { correctAnswer: false }
        })
        setEditing(true)
    }

    return editing ? question && (
        <div>
            <QuestionEditor question={question} setEditing={setEditing}
                setQuestion={(new_q) => {
                    let newQuestions = quiz.questions.filter(q => q._id !== new_q._id)
                    newQuestions.push(new_q)
                    setQuiz({...quiz, questions: newQuestions})
                }}/>
        </div>
    ) : (
        <div className="d-flex flex-column align-items-center justify-content-center">
            <ul className="wd-quizzes-list-item list-group rounded-0">
              {quiz.questions.map(q => (
                <li key={q._id} className="wd-quizzes-list-item list-group-item p-3 ps-1 d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <div>
                      <button className="wd-quizzes-link list-group-item text-black border border-0 p-0 mb-0 fs-3"
                                onClick={() => {
                                    setQuestion(q);
                                    setEditing(true);
                                }}>
                        <h4><b>{q.title}</b></h4>
                      </button>
                      <p className="mb-0">
                        {q.pts} pts
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <button className="btn btn-secondary d-flex align-items-center fs-5 flex-end mt-3" onClick={() => newQuestion()}>
              <BsPlus className="fs-4" />
              New Question 
            </button>
        </div>
    )
}