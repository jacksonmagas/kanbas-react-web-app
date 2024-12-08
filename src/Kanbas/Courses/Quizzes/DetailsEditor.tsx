import React, { useEffect, useState } from "react";
import { MdEventAvailable, MdUnpublished } from "react-icons/md";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { Assignment } from "../Assignments/reducer";
import * as coursesClient from "../client"
import { addAssignment } from "../Assignments/reducer";
import { useDispatch } from "react-redux";
import { addQuiz } from "./quizzesReducer";

const quizzes = [
  { _id: "123", title: "Q1 - HTML", type: "Graded Quiz", points: 29, status: "Closed", due: "2023-09-21", shuffle: "Yes", timeLimit: "20 Minutes", attempts: "1", showAnswers: "After submission", questions: [], publish: true },
  { _id: "124", title: "Q2 - CSS", type: "Graded Quiz", points: 32, status: "Closed", due: "2023-10-05", shuffle: "No", timeLimit: "30 Minutes", attempts: "1", showAnswers: "After submission", publish: false, questions: [] },

];




// const quizzez = useSelector((state: any) => state.quizzesReducer);

export default function DetailsEditor() {
  const { aid, cid } = useParams(); // quiz ID 
  const { pathname } = useLocation();
  const [quiz, setQuiz] = useState<any>({}); // State
  const dispatch = useDispatch();

  const navigate = useNavigate();



  const addQuizForCourse = async () => {
    if (!aid) return;
    const newQuiz = {
      title: quiz.title,
      course: cid,
      description: quiz.description,
      quizType: quiz.quizType,
      points: quiz.points, //It needs to be the sum of the points for all questions in the quiz
      assignmentGroup: quiz.assignmentGroup,
      shuffleAnswers: quiz.shuffleAnswers,
      timeLimit: quiz.timeLimit,
      multipleAttempts: quiz.multipleAttempts,
      showCorrectAnswers: quiz.showCorrectAnswers,
      accessCode: quiz.accessCode,
      oneQuestionAtATime: quiz.oneQuestionAtATime,
      webcamRequired: quiz.webcamRequired,
      lockQuestionsAfterAnswering: quiz.lockQuestionsAfterAnswering,
      dueDate: quiz.dueDate,
      availableDate: quiz.availableDate,
      untilDate: quiz.untilDate,
      questions: quiz.questions,
      publish: false,
    };
    try {
      // const newQuiz = await coursesClient.createQuizForCourse(cid ?? "", quiz);
      // dispatch(addQuiz(newQuiz));
      navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    } catch (error) {
      console.error("Failed to create quiz:", error);
    }
  };
  const updateQuizForCourse = async () => {
    if (!aid) return;
    const quizUp = {
      ...quiz,
    };
    try {
      const updatedQuiz = await coursesClient.updateQuizForCourse(cid ?? "", quizUp);
      dispatch(addQuiz(updatedQuiz));
      navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    } catch (error) {
      console.error("Failed to update quiz:", error);
    }
  };

  const handleCancelQuiz = () => {
    if (pathname.includes('new-quiz')) {
      navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    }
    else {
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${aid}`);
    }
  }

  // async function saveAssignment() {
  //   if (pathname.includes("new-assignment")) {
  //     await coursesClient.createQuizForCourse(cid ?? "", quiz)
  //     dispatch(addAssignment(assignment))
  //   } else {
  //     await assignmentClient.updateAssignment(assignment)
  //     dispatch(updateAssignment(assignment));
  //   }
  // }


  const handleSaveQuiz = () => {
    if (pathname.includes('new-quiz')) {

      addQuizForCourse();

      //createQuiz
      navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    }
    else {
      //updateQuiz

      updateQuizForCourse();

      navigate(`/Kanbas/Courses/${cid}/Quizzes/${aid}`);
    }
  }


  useEffect(() => {
    if (pathname.includes("new-quiz")) {
      setQuiz({
        title: "Unnamed Quiz",
        description: "WYSIWYG",
        quizType: "Graded Quiz",
        points: "0", //It needs to be the sum of the points for all questions in the quiz
        assignmentGroup: "Quizzes",
        shuffleAnswers: "Yes",
        timeLimit: "20",
        multipleAttempts: "No",
        showCorrectAnswers: "After Sumbission",
        accessCode: "",
        oneQuestionAtATime: "Yes",
        webcamRequired: "No",
        lockQuestionsAfterAnswering: "No",
        dueDate: new Date().toISOString(),
        availableDate: new Date().toISOString(),
        untilDate: new Date().toISOString(),
        questions: [],
        publish: false,
      });
    } else {
      const fetchedQuiz = quizzes.find(q => q._id === aid);
      setQuiz(fetchedQuiz);
    }
  }, [pathname]);



  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Quiz</h2>
        <div className="text-end">
          <h3>Points {quiz.questions ? quiz.questions.length : 0}</h3>
          {quiz.publish === false ? (
            <h5><MdUnpublished className="text-danger" /> Not Published </h5>
          ) : (
            <h3><GreenCheckmark /> Published </h3>
          )}
        </div>
      </div>
      {/* Quiz Name */}
      <div className="mb-3">
        <label htmlFor="assignmentName" className="form-label">
          Quiz Name
        </label>
        <input
          type="text"
          className="form-control"
          id="assignmentName"
          value={quiz.title}
          onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
        />
      </div>

      {/* Quiz Instructions */}
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Quiz Instructions
        </label>
        <textarea
          className="form-control"
          id="description"
          rows={5}
          placeholder="The Quiz is available online..."
          value={quiz.description}
          onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
        ></textarea>
      </div>

      {/* Quiz Type, Assignment Group,*/}
      <div className="mb-3">
        <label htmlFor="assignmentGroup" className="form-label">
          {" "}
          Quiz Type
        </label>
        <select
          className="form-control"
          id="assignmentGroup"
          value={quiz.quizType}
          onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}

        >
          <option>Graded Quiz</option>
          <option>Ungraded Quiz</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="assignmentGroup" className="form-label">
          Assignment Group
        </label>
        <select
          className="form-control"
          id="assignmentGroup"
          value={quiz.assignmentGroup}
          onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}
        >
          <option>Assignments</option>
          <option>Quizzes</option>
          <option>Exams</option>
          <option>Project</option>
        </select>
      </div>

      {/* Options Section */}
      <div className="row mb-3 justify-content-center">
        <div className="col-md-8">
          {/* Options Heading */}
          <label htmlFor="options" className="form-label fw-bold d-block mb-2">Options</label>

          {/* Shuffle Answers Option */}
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="shuffleAnswers"
            />
            <label
              className="form-check-label"
              htmlFor="shuffleAnswers"
            >
              Shuffle Answers
            </label>
          </div>

          {/* Time Limit Option */}
          <div className="form-check mt-2 d-flex align-items-center">
            <input
              type="checkbox"
              className="form-check-input"
              id="timeLimit"
            />
            <label
              className="form-check-label me-2"
              htmlFor="timeLimit"
            >
              Time Limit
            </label>
            <input
              type="number"
              className="form-control"
              id="timeLimitMinutes"
              value={quiz.timeLimit}
              onChange={(e) => setQuiz({ ...quiz, timeLimit: e.target.value })}
              style={{ width: '80px' }}
            />
            <span className="ms-2">Minutes</span>
          </div>

          {/* Allow Multiple Attempts Option */}
          <div className="form-check mt-2">
            <input
              type="checkbox"
              className="form-check-input"
              id="multipleAttempts"
            />
            <label
              className="form-check-label"
              htmlFor="multipleAttempts"
            >
              Allow Multiple Attempts
            </label>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-2">
          <label htmlFor="assignTo" className="form-label">
            Assign
          </label>
        </div>
        <div className="col-md-8">
          <div className="p-3 border">

            <label htmlFor="assignTo" className="form-label">
              Assign to
            </label>
            <input
              type="text"
              className="form-control mb-2"
              id="assignTo"
              defaultValue="Everyone"
              readOnly
            />


            <label htmlFor="dueDate" className="form-label">
              Due
            </label>
            <input type="date" className="form-control mb-2" id="dueDate" defaultValue={quiz.dueDate} />


            <div className="row mt-3">
              <div className="col-md-6">
                <label htmlFor="availableFrom" className="form-label">
                  Available from
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="availableFrom"
                  defaultValue={quiz.availableDate}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="until" className="form-label">
                  Until
                </label>
                <input type="date" className="form-control" id="until" defaultValue={quiz.untilDate} />
              </div>
            </div>


            <button className="btn btn-light mt-3 w-100">+ Add</button>
          </div>
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
  );
}


