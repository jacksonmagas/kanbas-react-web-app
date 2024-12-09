import { useState } from "react";
import { MdUnpublished } from "react-icons/md";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { AssignmentGroup, Quiz, QuizType } from "./quizzesReducer";

export default function DetailsEditor({quiz, setQuiz } : {quiz: Quiz, setQuiz : (quiz: Quiz) => void}) {
  const [multipleAttempts, setMultipleAttempts] = useState(false);
  return quiz ? (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Quiz</h2>
        <div className="text-end">
          <h3>Points {quiz.questions ? quiz.questions.length : 0}</h3>
          {quiz.published === false ? (
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
          className="form-control border-secondary"
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
          className="form-control border-secondary"
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
          Quiz Type
        </label>
        <select className="form-control border-secondary" id="assignmentGroup" value={quiz.type}
              onChange={(e) => setQuiz({ ...quiz, type: parseInt(e.target.value) })}>
          <option value={QuizType.GRADED}>Graded Quiz</option>
          <option value={QuizType.UNGRADED}>Ungraded Quiz</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="assignmentGroup" className="form-label">
          Assignment Group
        </label>
        <select
          className="form-control border-secondary"
          id="assignmentGroup"
          value={quiz.group}
          onChange={(e) => setQuiz({ ...quiz, group: parseInt(e.target.value) })}>
          <option value={AssignmentGroup.ASSIGNMENTS}>Assignments</option>
          <option value={AssignmentGroup.QUIZZES}>Quizzes</option>
          <option value={AssignmentGroup.EXAMS}>Exams</option>
          <option value={AssignmentGroup.PROJECTS}>Projects</option>
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
              className="form-check-input border-secondary"
              id="shuffleAnswers"
              checked={quiz.shuffleAnswers}
              onChange={e => setQuiz({...quiz, shuffleAnswers: e.target.checked})} />
            <label
              className="form-check-label"
              htmlFor="shuffleAnswers">
              Shuffle Answers
            </label>
          </div>

          {/* Time Limit Option */}
          <div className="form-check mt-2 d-flex align-items-center">
            <input
              type="checkbox"
              className="form-check-input border-secondary"
              id="timeLimit"
            />
            <label
              className="form-check-label me-2 ms-2"
              htmlFor="timeLimit"
            >
              Time Limit
            </label>
            <input
              type="number"
              className="form-control border-secondary"
              id="timeLimitMinutes"
              value={quiz.timeLimit}
              onChange={(e) => setQuiz({ ...quiz, timeLimit: parseInt(e.target.value) })}
              style={{ width: '80px' }}
            />
            <span className="ms-2">Minutes</span>
          </div>

          {/* Allow Multiple Attempts Option */}
          <div className="form-check mt-2">
            <input
              type="checkbox"
              checked={multipleAttempts}
              className="form-check-input border-secondary"
              id="multipleAttempts"
              onChange={e => setMultipleAttempts(e.target.checked)}/>
            <label
              className="form-check-label"
              htmlFor="multipleAttempts">
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
              className="form-control mb-2 border-secondary"
              id="assignTo"
              defaultValue="Everyone"
              readOnly />
            <label htmlFor="dueDate" className="form-label">
              Due
            </label>
            <input type="date" className="form-control mb-2 border-secondary" id="dueDate" defaultValue={quiz.due.substring(0, 10)}
                onChange={e => setQuiz({...quiz, due: new Date(e.target.value).toISOString()})} />
            <div className="row mt-3">
              <div className="col-md-6">
                <label htmlFor="availableFrom" className="form-label">
                  Available from
                </label>
                <input
                  type="date"
                  className="form-control border-secondary"
                  id="availableFrom"
                  defaultValue={quiz.availableFrom.substring(0, 10)}
                  onChange={e => setQuiz({...quiz, availableFrom: new Date(e.target.value).toISOString()})} />
              </div>
              <div className="col-md-6">
                <label htmlFor="until" className="form-label">
                  Until
                </label>
                <input type="date" className="form-control border-secondary" id="until" defaultValue={quiz.availableUntil.substring(0, 10)}
                  onChange={e => setQuiz({...quiz, availableUntil: new Date(e.target.value).toISOString()})} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : <div>
    Quiz didn't load
  </div>;
}


