import { RiErrorWarningLine } from "react-icons/ri";
import { MdArrowRight } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { RxQuestionMarkCircled } from "react-icons/rx";

import { useNavigate, useParams } from "react-router-dom";


export default function QuizPreview() {
    const navigate = useNavigate();
    const { aid } = useParams();

    return (
        <div>
            <h2><b>Q1 - HTML</b></h2>
            <div className="alert alert-danger d-flex align-items-center gap-2" role="alert">
                <RiErrorWarningLine className="fs-4" />
                <span>This is a preview of the published version of the quiz</span>
            </div>
            <h6>Started at: Nov at 8:19am</h6>
            <h3><b>Quiz Instructions</b></h3>
            <hr />
            <div className="card ms-5 me-5">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <span><b>Question 1</b></span>
                    <span>1pts</span>
                </div>
                <div className="card-body">
                    <p className="card-text">
                        An HTML label element can be associated with an HTML input element by setting their id attributes to the same value. </p>
                    <p className="card-text">
                        The resulting effect is that when you click on the label text, the input element receives focus as if you had click on the input element itself. </p>
                    <hr />
                    True
                    <hr />
                    False
                    <hr />

                </div>
            </div>
            <br />
            <div className="d-flex justify-content-end  me-5">
                <button className="btn btn-secondary d-flex align-items-center ">
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
                onClick={() => navigate(`../Quizzes/${aid}/edit`)}
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
                    <li className="d-flex align-items-center gap-2">
                        <RxQuestionMarkCircled />
                        <span className="text-danger"><b>Question 1</b></span>
                    </li>
                    <li className="d-flex align-items-center gap-2">
                        <RxQuestionMarkCircled />
                        <span className="text-danger">Question 2</span>
                    </li>
                    <li className="d-flex align-items-center gap-2">
                        <RxQuestionMarkCircled />
                        <span className="text-danger">Question 3</span>
                    </li>
                    <li className="d-flex align-items-center gap-2">
                        <RxQuestionMarkCircled />
                        <span className="text-danger">Question 4</span>
                    </li>
                    <li className="d-flex align-items-center gap-2">
                        <RxQuestionMarkCircled />
                        <span className="text-danger">Question 5</span>
                    </li>
                </ul>
            </div>

        </div>


    );

}
