import { Link, useNavigate, useParams } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import { useKanbasSelector } from "../../../hooks";
import { RoleView } from "../../Account/RoleShownContent";
import * as quizClient from "./client"
import { useEffect, useState } from "react";
import { AssignmentGroup, assignmentGroupName, quizTypeName } from "./quizzesReducer";

export default function Details() {
    const navigate = useNavigate();
    const { currentUser } = useKanbasSelector(s => s.accountReducer);
    const [takenAttempts, setTakenAttempts] = useState(0);
    const { qid } = useParams(); // Get the quiz ID from the URL
    const { quizzes } = useKanbasSelector(s => s.quizzesReducer);
    const quiz = quizzes.find(q => q._id === qid); // Find the quiz based on the ID

    const fetchNumberOfAttempts = async () => {
        if (!currentUser || !qid) return;
        const attempts = await quizClient.findQuizAttempts(currentUser._id, qid)
        if (attempts && attempts.length > 0) {
            setTakenAttempts(attempts.length)
        }
    }

    useEffect(() => {
        fetchNumberOfAttempts()
    } , [])

    if (!quiz) {
        return <div>Quiz not found</div>; // Handle case where quiz is not found
    }
    return (
        <div>
            <div className="d-flex justify-content-center gap-2 mb-2">
                <RoleView role="FACULTY">
                    <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => navigate("preview")}>
                        Preview
                    </button>
                    <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => navigate("edit")}
                    >
                        <FaPencilAlt /> Edit
                    </button>
                </RoleView>
                <RoleView role="STUDENT" loose>

                    <button
                        className="btn btn-primary btn-sm btn-primary"
                        onClick={() => navigate(`../Quizzes/${qid}/results`)}
                    >
                        View Last Attempt
                    </button>
                    {quiz.attempts > takenAttempts && <button
                        className="btn btn-primary btn-sm btn-danger"
                        onClick={() => navigate("start")}>
                        Start
                    </button>}
                </RoleView>
            </div>
            <hr />
            <h3><b>{quiz.title}</b></h3>
            <br />
            <div className="container">
                <table className="mx-auto ms-5">
                    <tbody>
                        <tr><td className="text-end pe-2"><b>Quiz Type:</b></td><td>{quizTypeName(quiz.type)}</td></tr>
                        <tr><td className="text-end pe-2"><b>Points:</b></td><td>{quiz.points}</td></tr>
                        <tr><td className="text-end pe-2"><b>Assignment Group:</b></td><td>{assignmentGroupName(quiz.group)}</td></tr>
                        <tr><td className="text-end pe-2"><b>Shuffle Answers:</b></td><td>{quiz.shuffleAnswers ? "Yes" : "No"}</td></tr>
                        <tr><td className="text-end pe-2"><b>Time Limit:</b></td><td>{quiz.timeLimitEnabled ? `${quiz.timeLimit} Minutes` : "None"}</td></tr>
                        <tr><td className="text-end pe-2"><b>Multiple Attempts:</b></td><td>{quiz.attempts === 1 ? "No" : "Yes"}</td></tr>
                        <tr><td className="text-end pe-2"><b>How Many Attempts:</b></td><td>{quiz.attempts}</td></tr>
                        <tr><td className="text-end pe-2"><b>Show Correct Answers:</b></td><td>After submission</td></tr>
                        <tr><td className="text-end pe-2"><b>Access Code:</b></td><td>None</td></tr>
                        <tr><td className="text-end pe-2"><b>One Question at a Time:</b></td><td>Yes</td></tr>
                        <tr><td className="text-end pe-2"><b>Webcam Required:</b></td><td>No</td></tr>
                        <tr><td className="text-end pe-2"><b>Lock Questions After Answering:</b></td><td>Yes</td></tr>
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
                            <td>{`${new Date(quiz.due).toLocaleDateString("en-US", {month: "short", day: "2-digit"})}
                             at ${new Date(quiz.due).toLocaleTimeString("en-US", {hour: "numeric", hour12: true})}`}</td>
                            <td>Everyone</td>
                            <td>{`${new Date(quiz.availableFrom).toLocaleDateString("en-US", {month: "short", day: "2-digit"})}
                             at ${new Date(quiz.availableFrom).toLocaleTimeString("en-US", {hour: "numeric", hour12: true})}`}</td>
                            <td>{`${new Date(quiz.availableUntil).toLocaleDateString("en-US", {month: "short", day: "2-digit"})}
                             at ${new Date(quiz.availableUntil).toLocaleTimeString("en-US", {hour: "numeric", hour12: true})}`}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
