import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { RiErrorWarningLine } from "react-icons/ri";
import { MdArrowRight } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { RxQuestionMarkCircled } from "react-icons/rx";
import { useNavigate, useParams } from "react-router-dom";
import { QuestionType, QuizQuestion } from './QuestionEditors';
import { AssignmentGroup, QuizType } from './quizzesReducer';
import { isMultipleChoiceAnswer } from './QuestionEditors/MultipleChoiceEditor';
import { isTrueFalseAnswer, TrueFalseAnswer } from './QuestionEditors/TrueFalseQuestionEditor';
import { useKanbasSelector } from '../../../hooks';
import { isFillInTheBlankAnswer } from './QuestionEditors/FillInTheBlankEditor';
import { RoleView } from '../../Account/RoleShownContent';
import * as quizClient from "./client"
import { Answer } from './QuizTake';

export default function QuizResults() {
    const { quizzes } = useKanbasSelector(s => s.quizzesReducer);
    const { currentUser } = useKanbasSelector(s => s.accountReducer);
    const [userAnswers, setUserAnswers] = useState<Answer[]>([]);
    const [startTime, setStartTime] = useState<string>("");
    const location = useLocation();
    const score = location.state?.totalScore; // Retrieve score from state
    const { qid } = useParams();
    const quiz = quizzes.find(q => q._id === qid);
    const totalPoints = quiz ? quiz.questions.reduce((total, question) => total + question.pts, 0) : 0;

    const navigate = useNavigate();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const fetchAttempt = async () => {
        if (!currentUser || !qid) return;
        const attempts = await quizClient.findQuizAttempts(currentUser._id, qid)
        if (attempts && attempts.length > 0) {
            setUserAnswers(attempts[0].answers);
        }
    }

    useEffect(() => {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = { month: 'short', hour: 'numeric', day: 'numeric', minute: 'numeric', hour12: true };
        fetchAttempt()
        setStartTime(now.toLocaleString('en-US', options));
    }, []);


    const handleNext = () => {
        if (quiz && currentQuestionIndex < (quiz.questions.length - 1)) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    return (
        <div>
            <div>
                <h2>Quiz Results</h2>
                {score !== undefined ? (
                    <p>Your score: {score} / {totalPoints}</p>
                ) : (
                    <p>No score available.</p>
                )}
            </div>

            {quiz ? (
                <>
                    <h2><b>{quiz.title}</b></h2>
                    <RoleView role="FACULTY">
                        <div className="alert alert-danger d-flex align-items-center gap-2" role="alert">
                            <RiErrorWarningLine className="fs-4" />
                            <span>This is a preview of the published version of the quiz</span>
                        </div>
                    </RoleView>
                    <RoleView role="STUDENT">
                        <div className="alert alert-primary d-flex align-items-center gap-2" role="alert">
                            <RiErrorWarningLine className="fs-4" />
                            <span>This is the results section from the quiz</span>
                        </div>
                    </RoleView>
                </>
            ) : (
                <h2>Quiz not found.</h2>
            )}
            <h6>Finished at: {startTime}</h6>
            <h3><b>Quiz Instructions</b></h3>
            <hr />
            <div className="card ms-5 me-5">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <span><b>Question {currentQuestionIndex + 1}</b></span>
                    <span>{quiz?.questions[currentQuestionIndex]?.pts}pts</span>
                </div>
                <div className="card-body">
                    {quiz ? (
                        <>
                            <p className="card-text" dangerouslySetInnerHTML={{ __html: quiz.questions[currentQuestionIndex]?.question }} />
                            <hr />
                            <div>
                                {quiz.questions[currentQuestionIndex]?.type === QuestionType.TRUE_FALSE && (
                                    <div>
                                        <label>
                                            <input type="radio" name="answer" value="True" />
                                            True
                                        </label>
                                        <hr />
                                        <label>
                                            <input type="radio" name="answer" value="False" />
                                            False
                                        </label>
                                    </div>
                                )}
                                {quiz.questions[currentQuestionIndex]?.type === QuestionType.MULTIPLE_CHOICE
                                    && isMultipleChoiceAnswer(quiz.questions[currentQuestionIndex].answer)
                                    && (<div>
                                        {quiz.questions[currentQuestionIndex]?.answer.answers.map((answer, index) => (
                                            <div key={index}>
                                                <label>
                                                    <input type="radio" name="answer" value={answer.text} />
                                                    {answer.text}
                                                </label>
                                                <hr />
                                            </div>
                                        ))}
                                    </div>)}
                                {quiz.questions[currentQuestionIndex]?.type === QuestionType.FILL_IN_THE_BLANK
                                    && (quiz.questions[currentQuestionIndex].answer)
                                    && (<div>
                                        <label>
                                            <input type="text" name="answer" placeholder="" />
                                        </label>
                                    </div>
                                    )}
                            </div>
                        </>

                    ) : (
                        <p className="card-text">Quiz not found.</p>
                    )}

                </div>
                <div className='card-footer text-muted'>
                    {quiz?.questions[currentQuestionIndex]?.type === QuestionType.TRUE_FALSE && (
                        <div>
                            <p className={isTrueFalseAnswer(quiz.questions[currentQuestionIndex].answer) &&
                                (results[currentQuestionIndex]?.userAnswer.toLowerCase() ===
                                    String((quiz.questions[currentQuestionIndex].answer as TrueFalseAnswer).correctAnswer).toLowerCase()) ? "text-success" : "text-danger"}>
                                You Chose: {results[currentQuestionIndex]?.userAnswer || 'No answer'}
                            </p>
                            <p className={"text-success"}>
                                Correct Answer: {isTrueFalseAnswer(quiz.questions[currentQuestionIndex].answer) ? (quiz.questions[currentQuestionIndex].answer.correctAnswer ? "True" : "False") : "N/A"}
                            </p>
                        </div>
                    )}
                    {quiz?.questions[currentQuestionIndex]?.type === QuestionType.MULTIPLE_CHOICE && (
                        <div>
                            <p className={isMultipleChoiceAnswer(quiz.questions[currentQuestionIndex].answer) && (results[currentQuestionIndex]?.userAnswer === quiz.questions[currentQuestionIndex].answer.answers.find(answer => answer.correct)?.text) ? "text-success" : "text-danger"}>
                                You Chose: {results[currentQuestionIndex]?.userAnswer || 'No answer'}
                            </p>
                            <p className={"text-success"}>
                                Correct Answer: {isMultipleChoiceAnswer(quiz.questions[currentQuestionIndex].answer) && quiz.questions[currentQuestionIndex].answer.answers.find(answer => answer.correct)?.text}
                            </p>
                        </div>
                    )}
                    {quiz?.questions[currentQuestionIndex]?.type === QuestionType.FILL_IN_THE_BLANK && (
                        <div>
                            <p className={isFillInTheBlankAnswer(quiz.questions[currentQuestionIndex].answer) && quiz.questions[currentQuestionIndex]?.answer.answers.map(answer => answer.text).join(', ').toLowerCase().includes(results[currentQuestionIndex]?.userAnswer.toLowerCase()) ? "text-success" : "text-danger"}>
                                You Chose: {results[currentQuestionIndex]?.userAnswer || 'No answer'}
                            </p>
                            <p className='text-success'>Correct Answer: {isFillInTheBlankAnswer(quiz.questions[currentQuestionIndex].answer) && quiz.questions[currentQuestionIndex].answer.answers.map(answer => answer.text).join(', ')}</p>
                        </div>
                    )}
                </div>

            </div>
            <br />
            <div className="d-flex justify-content-end me-5">
                <button className="btn btn-secondary d-flex align-items-center"
                    onClick={handleNext}

                >
                    <span>Next</span>
                    <MdArrowRight className="fs-4" />
                </button>
            </div>
            <br />
            <div className="border border-2 p-2">
                <div className="d-flex justify-content-end align-items-center gap-3">
                    <p className="mb-0">Quiz saved at 8:19am</p>
                    <button className="btn btn-secondary">Submit Quiz</button>
                </div>
            </div>
            <br />
            <br />
            <RoleView role="FACULTY">
                <button
                    onClick={() => navigate(`../Quizzes/${qid}/edit`)}
                    className="btn btn-secondary w-100 d-flex align-items-center gap-2 p-2"
                >
                    <FaPencilAlt />
                    <span>Keep Editing this Quiz</span>
                </button>
            </RoleView>
            <br />

            <div className="questions-container">
                <h3>Questions</h3>
                <ul className="questions-list list-unstyled ps-3">
                    {quiz ? (
                        quiz.questions.map((question, index) => (
                            <li key={index} className="d-flex align-items-center gap-2">
                                <RxQuestionMarkCircled />
                                <span className={currentQuestionIndex === index ? "text-danger fw-bold" : "text-danger"}>
                                    Question {index + 1}
                                </span>
                            </li>
                        ))
                    ) : (
                        <li>No questions available.</li>
                    )}
                </ul>
            </div>

        </div>


    );

}

