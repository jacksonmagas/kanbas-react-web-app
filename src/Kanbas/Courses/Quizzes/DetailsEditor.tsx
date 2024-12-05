import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const quizzes = [
  { id: "123", title: "Q1 - HTML", type: "Graded Quiz", points: 29, status: "Closed", due: "2023-09-21", shuffle: "Yes", timeLimit: "20 Minutes", attempts: "1", showAnswers: "After submission" },
  { id: "124", title: "Q2 - CSS", type: "Graded Quiz", points: 32, status: "Closed", due: "2023-10-05", shuffle: "No", timeLimit: "30 Minutes", attempts: "1", showAnswers: "After submission" },
  // Add more quizzes as needed
];

export default function DetailsEditor() {
  const { aid } = useParams(); // quiz ID 
  const [quiz, setQuiz] = useState<any>({}); // State

  useEffect(() => {

    const fetchedQuiz = quizzes.find(q => q.id === aid);
    if (fetchedQuiz) {
      setQuiz(fetchedQuiz);
    }
  }, [aid]);

  return (
    <div className="container mt-4">
      <h2>Edit Assignment</h2>
      {/* Quiz Name */}
      <div className="mb-3">
        <label htmlFor="assignmentName" className="form-label">
          Quiz Name
        </label>
        <input
          type="text"
          className="form-control"
          id="assignmentName"
          defaultValue={quiz.title}
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
          defaultValue="Assignments"
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
          defaultValue="Assignments"
        >
          <option>ASSIGNMENTS</option>
          <option>QUIZZE</option>
          <option>Exams</option>
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
              placeholder=""
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
            <input type="date" className="form-control mb-2" id="dueDate" />


            <div className="row mt-3">
              <div className="col-md-6">
                <label htmlFor="availableFrom" className="form-label">
                  Available from
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="availableFrom"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="until" className="form-label">
                  Until
                </label>
                <input type="date" className="form-control" id="until" />
              </div>
            </div>


            <button className="btn btn-light mt-3 w-100">+ Add</button>
          </div>
        </div>
      </div>


      <hr className="mt-4 mb-3" />


      <div className="d-flex justify-content-center">
        <button type="button" className="btn btn-secondary me-3">
          Cancel
        </button>
        <button type="submit" className="btn btn-danger">
          Save
        </button>
      </div>

      <hr className="mt-3" />
    </div>
  );
}
