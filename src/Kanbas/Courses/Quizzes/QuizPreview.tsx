import React, { useState } from 'react';
import { RiErrorWarningLine } from "react-icons/ri";
import { MdArrowRight } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { RxQuestionMarkCircled } from "react-icons/rx";

import { useNavigate, useParams } from "react-router-dom";


const quizzes = [
    {
        _id: "123",
        title: "Q1 - HTML",
        type: "Graded Quiz",
        points: 29,
        status: "Closed",
        due: "2023-09-21",
        shuffle: "Yes",
        timeLimit: "20 Minutes",
        attempts: "1",
        showAnswers: "After submission",
        questions: [
            {
                description: " An HTML label element can be associated with an HTML input element by setting their id attributes to the same value.",
                options: ["True", "False"], answer: "True"
            },
            {
                description: " jkl;;l;kjllj associated with an HTML input element by setting their id attributes to the same value.",
                options: ["True", "False"], answer: "True"
            }
        ], publish: true
    },
    { _id: "124", title: "Q2 - CSS", type: "Graded Quiz", points: 32, status: "Closed", due: "2023-10-05", shuffle: "No", timeLimit: "30 Minutes", attempts: "1", showAnswers: "After submission", publish: false, questions: [] },

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
                    <span>1pts</span>
                </div>
                <div className="card-body">
                    {quiz ? (
                        <>
                            <p className="card-text">
                                {quiz.questions[currentQuestionIndex]?.description} </p>
                        </>
                    ) : (
                        <p className="card-text">Quiz not found.</p>
                    )}
                    <hr />
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
                    <hr />

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
