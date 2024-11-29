import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";

export default function Details() {
    const navigate = useNavigate();
    return (
        <div>
            <div className="d-flex justify-content-center gap-2 mb-2">
                <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => navigate("preview")}
                >
                    Preview</button>
                <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => navigate("edit")}
                >
                    <FaPencilAlt /> Edit
                </button>
            </div>
            <hr />
            <h3><b>Q1 - HTML</b></h3>
            <br />
            <div className="container">
                <table className="mx-auto ms-5">
                    <tbody>
                        <tr><td className="text-end pe-2"><b>Quiz Type:</b></td><td>Graded Quiz</td></tr>
                        <tr><td className="text-end pe-2"><b>Points:</b></td><td>29</td></tr>
                        <tr><td className="text-end pe-2"><b>Assignment Group:</b></td><td>Quizzes</td></tr>
                        <tr><td className="text-end pe-2"><b>Shuffle Answers:</b></td><td>Yes</td></tr>
                        <tr><td className="text-end pe-2"><b>Time Limit:</b></td><td>20 Minutes</td></tr>
                        <tr><td className="text-end pe-2"><b>Multiple Attempts:</b></td><td>No</td></tr>
                        <tr><td className="text-end pe-2"><b>How Many Attempts:</b></td><td>1</td></tr>
                        <tr><td className="text-end pe-2"><b>Show Correct Answers:</b></td><td>After submission</td></tr>
                        <tr><td className="text-end pe-2"><b>Access Code:</b></td><td>None</td></tr>
                        <tr><td className="text-end pe-2"><b>One Question at a Time:</b></td><td>Yes</td></tr>
                        <tr><td className="text-end pe-2"><b>Webcam Required:</b></td><td>No</td></tr>
                        <tr><td className="text-end pe-2"><b>Lock Questions After Answering:</b></td><td>No</td></tr>
                    </tbody>
                </table>
            </div>
            <br />
            <div id="quiz-due-dates">
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th>Due</th>
                            <th>For</th>
                            <th>Available from</th>
                            <th>Until</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Sep 21 at 1pm</td>
                            <td>Everyone</td>
                            <td>Sep 21 at 11:40am</td>
                            <td>Sep 21 at 1pm</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
