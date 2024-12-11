import React, { useEffect, useState } from 'react';
import { RiErrorWarningLine } from "react-icons/ri";
import { MdArrowRight } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { RxQuestionMarkCircled } from "react-icons/rx";

import { useNavigate, useParams } from "react-router-dom";
import { QuestionType, QuizQuestion } from './QuestionEditors';
import { AssignmentGroup, QuizType } from './quizzesReducer';
import { isMultipleChoiceAnswer } from './QuestionEditors/MultipleChoiceEditor';
import { isTrueFalseAnswer } from './QuestionEditors/TrueFalseQuestionEditor';
import { useKanbasSelector } from '../../../hooks';
import { isFillInTheBlankAnswer } from './QuestionEditors/FillInTheBlankEditor';



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
// const quizzes: Quiz[] = [
//     {
//         _id: "123",
//         instructions: "description",
//         title: "Q1 - HTML",
//         status: "closed",
//         points: 2,
//         type: QuizType.GRADED,
//         group: AssignmentGroup.QUIZZES,
//         shuffleAnswers: true,
//         timeLimit: 20,
//         attempts: "1",
//         showAnswers: "After submission",
//         questions: [
//             {
//                 _id: "0",
//                 title: "foo",
//                 pts: 5,
//                 type: QuestionType.TRUE_FALSE,
//                 question: "is water wet",
//                 answer: {
//                     correctAnswer: false
//                 }
//             },
//             {
//                 _id: "1",
//                 title: "whatever",
//                 pts: 10,
//                 type: QuestionType.MULTIPLE_CHOICE,
//                 question: "what is 2+2",
//                 answer: {
//                     answers: [
//                         {
//                             text: "3",
//                             correct: false
//                         },
//                         {
//                             text: "4",
//                             correct: true
//                         }
//                     ]
//                 }
//             },
//             {
//                 _id: "2",
//                 title: "whatever",
//                 pts: 10,
//                 type: QuestionType.FILL_IN_THE_BLANK,
//                 question: "what is 2+2",
//                 answer: {
//                     answers: [
//                         {
//                             text: "3",
//                             caseSensitive: false
//                         },
//                         {
//                             text: "4",
//                             caseSensitive: true
//                         }
//                     ]
//                 }
//             }
//         ],
//         due: "232",
//         availableFrom: "232",
//         availableUntil: "232",
//         publish: true,
//     }
// ];


export default function QuizTake() {
    const { quizzes } = useKanbasSelector(s => s.quizzesReducer);

    const navigate = useNavigate();
    const [userAnswers, setUserAnswers] = useState<string[]>([]);
    const { qid } = useParams();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [startTime, setStartTime] = useState<string>("");
    const [score, setScore] = useState<number | null>(null);
    const [results, setResults] = useState<{ questionId: string; userAnswer: string; correctAnswer: string }[]>([]);

    useEffect(() => {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = { month: 'short', hour: 'numeric', day: 'numeric', minute: 'numeric', hour12: true };
        setStartTime(now.toLocaleString('en-US', options));
    }, []);


    const quiz = quizzes.find(q => q._id === qid);

    const handleNext = () => {
        if (quiz && currentQuestionIndex < (quiz.questions.length - 1)) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handleAnswerChange = (answer: string) => {
        const updatedAnswers = [...userAnswers];
        updatedAnswers[currentQuestionIndex] = answer;
        setUserAnswers(updatedAnswers);
    };

    const handleFillInTheBlankChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleAnswerChange(event.target.value);
    };

    const handleSubmit = () => {
        if (quiz) {
            let totalScore = 0;
            const newResults: any = []; // Array to hold the results

            quiz.questions.forEach((question, index) => {
                let correctAnswer = "";
                if (question.type === QuestionType.TRUE_FALSE && isTrueFalseAnswer(question.answer)) {
                    const correctAnswer = question.answer.correctAnswer ? "True" : "False";
                    if (userAnswers[index] === correctAnswer) {
                        totalScore += question.pts;
                    }
                } else if (question.type === QuestionType.MULTIPLE_CHOICE && isMultipleChoiceAnswer(question.answer)) {
                    const correctAnswer = question.answer.answers.find(answer => answer.correct)?.text;
                    if (userAnswers[index] === correctAnswer) {
                        totalScore += question.pts;
                    }
                } else if (question.type === QuestionType.FILL_IN_THE_BLANK && isFillInTheBlankAnswer(question.answer)) {
                    const userAnswer = userAnswers[index];
                    const possibleAnswers = question.answer.answers;

                    const isCorrect = possibleAnswers.some(answer => {
                        if (answer.caseSensitive) {
                            return userAnswer === answer.text;
                        } else {
                            return userAnswer.toLowerCase() === answer.text.toLowerCase();
                        }
                    });

                    if (isCorrect) {
                        totalScore += question.pts;
                    }
                    correctAnswer = possibleAnswers.map(answer => answer.text).join(", "); // Store all possible correct answers
                }

                newResults.push({
                    questionId: question._id,
                    userAnswer: userAnswers[index],
                    correctAnswer: correctAnswer,
                });
            });

            setResults(newResults);
            setScore(totalScore);
            setScore(totalScore);
            console.log(totalScore);
            navigate(`../Quizzes/${qid}/results`, { state: { totalScore, results: newResults } });

        }
    };

    return (
        <div>
            {quiz ? (
                <>
                    <h2><b>{quiz.title}</b></h2>
                </>
            ) : (
                <h2>Quiz not found.</h2>
            )}
            <h6>Started at: {startTime}</h6>
            <h3><b>Quiz Instructions</b></h3>
            <h4>{quiz?.description}</h4>
            <hr />
            <div className="card ms-5 me-5">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <span><b>Question {currentQuestionIndex + 1}</b></span>
                    <span>{quiz?.questions[currentQuestionIndex]?.pts}pts</span>
                </div>
                <div className="card-body">
                    {quiz ? (
                        <>
                            <p className="card-text" dangerouslySetInnerHTML={{ __html: quiz.questions[currentQuestionIndex]?.question }}>
                                {/* {quiz.questions[currentQuestionIndex]?.question} */}
                            </p>
                            <hr />
                            <div>
                                {quiz.questions[currentQuestionIndex]?.type === QuestionType.TRUE_FALSE && (
                                    <div>
                                        <label>
                                            <input
                                                type="radio"
                                                name="answer"
                                                value="True"
                                                checked={userAnswers[currentQuestionIndex] === "True"}
                                                onChange={() => handleAnswerChange("True")}
                                            />
                                            True
                                        </label>
                                        <hr />
                                        <label>
                                            <input
                                                type="radio"
                                                name="answer"
                                                value="False"
                                                checked={userAnswers[currentQuestionIndex] === "False"}
                                                onChange={() => handleAnswerChange("False")}
                                            />
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
                                                    <input
                                                        type="radio"
                                                        name="answer"
                                                        value={answer.text}
                                                        checked={userAnswers[currentQuestionIndex] === answer.text}
                                                        onChange={() => handleAnswerChange(answer.text)}
                                                    />
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
                                            <input type="text" name="answer" placeholder="" onChange={handleFillInTheBlankChange} />
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
                    <button className="btn btn-secondary" onClick={handleSubmit}>Submit Quiz</button>
                </div>
            </div>
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
