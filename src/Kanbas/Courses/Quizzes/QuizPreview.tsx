import React, { useState } from 'react';
import { RiErrorWarningLine } from "react-icons/ri";
import { MdArrowRight } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { RxQuestionMarkCircled } from "react-icons/rx";

import { useNavigate, useParams } from "react-router-dom";
import { QuestionType, QuizQuestion } from './QuestionEditors';
import { AssignmentGroup, QuizType } from './quizzesReducer';
import { isMultipleChoiceAnswer } from './QuestionEditors/MultipleChoiceEditor';
import { isTrueFalseAnswer } from './QuestionEditors/TrueFalseQuestionEditor';



export interface Quiz {
    _id: string,
    instructions: string,
    title: string,
    type: QuizType,
    group: AssignmentGroup,
    points: number,
    status: string,
    shuffleAnswers: boolean,
    timeLimit: number,
    attempts: string,
    showAnswers: string,
    questions: QuizQuestion[],
    due: string,
    availableFrom: string,
    availableUntil: string,
    publish: boolean,

}
const quizzes: Quiz[] = [
    {
        _id: "123",
        instructions: "description",
        title: "Q1 - HTML",
        status: "closed",
        points: 2,
        type: QuizType.GRADED,
        group: AssignmentGroup.QUIZZES,
        shuffleAnswers: true,
        timeLimit: 20,
        attempts: "1",
        showAnswers: "After submission",
        questions: [
            {
                _id: "0",
                title: "foo",
                pts: 5,
                type: QuestionType.TRUE_FALSE,
                question: "is water wet",
                answer: {
                    correctAnswer: false
                }
            },
            {
                _id: "1",
                title: "whatever",
                pts: 10,
                type: QuestionType.MULTIPLE_CHOICE,
                question: "what is 2+2",
                answer: {
                    answers: [
                        {
                            text: "3",
                            correct: false
                        },
                        {
                            text: "4",
                            correct: true
                        }
                    ]
                }
            },
            {
                _id: "2",
                title: "whatever",
                pts: 10,
                type: QuestionType.FILL_IN_THE_BLANK,
                question: "what is 2+2",
                answer: {
                    answers: [
                        {
                            text: "3",
                            caseSensitive: false
                        },
                        {
                            text: "4",
                            caseSensitive: true
                        }
                    ]
                }
            }
        ],
        due: "232",
        availableFrom: "232",
        availableUntil: "232",
        publish: true,
    }
];

export default function QuizPreview() {
    const navigate = useNavigate();
    const { qid } = useParams();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const quiz = quizzes.find(q => q._id === qid);

    const handleNext = () => {
        if (quiz && currentQuestionIndex < (quiz.questions.length - 1)) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    return (
        <div>
            {quiz ? (
                <>
                    <h2><b>{quiz.title}</b></h2>
                    <div className="alert alert-danger d-flex align-items-center gap-2" role="alert">
                        <RiErrorWarningLine className="fs-4" />
                        <span>This is a preview of the published version of the quiz</span>
                    </div>
                </>
            ) : (
                <h2>Quiz not found.</h2>
            )}
            <h6>Started at: Nov at 8:19am</h6>
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
                            <p className="card-text">
                                {quiz.questions[currentQuestionIndex]?.question}
                            </p>
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
                                {quiz.questions[currentQuestionIndex]?.type === QuestionType.TRUE_FALSE
                                && isTrueFalseAnswer(quiz.questions[currentQuestionIndex].answer)
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
            <button
                onClick={() => navigate(`../Quizzes/${qid}/edit`)}
                className="btn btn-secondary w-100 d-flex align-items-center gap-2 p-2"
            >
                <FaPencilAlt />
                <span>Keep Editing this Quiz</span>
            </button>
            <br />
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
