import { useState } from "react";
import TrueFalseQuestionEditor, { isTrueFalseAnswer as isTrueFalseAnswer, TrueFalseAnswer } from "./TrueFalseQuestionEditor";
import MultipleChoiceEditor, { isMultipleChoiceAnswer as isMultipleChoiceAnswer, MultipleChoiceAnswer as MultipleChoiceAnswers } from "./MultipleChoiceEditor";
import FillInTheBlankEditor, { FillInTheBlankAnswer as FillInTheBlankAnswers, isFillInTheBlankAnswer as isFillInTheBlankAnswer } from "./FillInTheBlankEditor";

export enum QuestionType {
  // other parts of the code rely on this being int based
  TRUE_FALSE = 0,
  MULTIPLE_CHOICE = 1,
  FILL_IN_THE_BLANK = 2
}

export interface QuizQuestion {
  _id: string,
  title: string,
  pts: number,
  type: QuestionType,
  question: string,
  answer: TrueFalseAnswer | MultipleChoiceAnswers | FillInTheBlankAnswers
}

export function isQuizQuestion(obj: unknown): obj is QuizQuestion {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }
  const quizQuestion = obj as QuizQuestion;
  // Check if the object has the expected properties
  if (typeof quizQuestion.title !== 'string' ||
      typeof quizQuestion.pts !== 'number' ||
      !(quizQuestion.type in QuestionType) ||
      typeof quizQuestion.question !== 'string') {
    return false;
  }
  // Based on the type, validate the 'answer' property
  switch (quizQuestion.type) {
    case QuestionType.TRUE_FALSE:
      return isTrueFalseAnswer(quizQuestion.answer);
    case QuestionType.MULTIPLE_CHOICE:
      return isMultipleChoiceAnswer(quizQuestion.answer);
    case QuestionType.FILL_IN_THE_BLANK:
      return isFillInTheBlankAnswer(quizQuestion.answer);
    default:
      return false;
  }
}

const QuestionEditor = ({ question, setQuestion, setEditing }
                      : { question: QuizQuestion, setQuestion: (question: QuizQuestion) => void, setEditing: (editing: boolean) => void}) => {
  const [newQuestion, setNewQuestion] = useState(question);
  const renderEditor = (): JSX.Element => {
    switch (newQuestion.type) {
      case QuestionType.TRUE_FALSE:
        return <TrueFalseQuestionEditor question={newQuestion} setQuestion={setNewQuestion}/>;
      case QuestionType.MULTIPLE_CHOICE:
        return <MultipleChoiceEditor question={newQuestion} setQuestion={setNewQuestion} />;
      case QuestionType.FILL_IN_THE_BLANK:
        return <FillInTheBlankEditor question={newQuestion} setQuestion={setNewQuestion} />;
      default:
        return <div>Please select a question type.</div>;
    }
  };

  const save = () => {
    switch (newQuestion.type) {
      case QuestionType.FILL_IN_THE_BLANK:
        if (!isFillInTheBlankAnswer(newQuestion.answer)) {
          return;
        }
        setNewQuestion({...newQuestion, answer: {answers: newQuestion.answer.answers.map(a => ({...a, text: a.text.trim()})).filter(a => a.text !== "")}})
        if (newQuestion.answer.answers.length === 0) {
          alert("Please provide at least one correct answer")
          return
        }
        break;
      case QuestionType.MULTIPLE_CHOICE:
        if (!isMultipleChoiceAnswer(newQuestion.answer)) {
          return;
        }
        setNewQuestion({...newQuestion, answer: {answers: newQuestion.answer.answers.map(a => ({...a, text: a.text.trim()})).filter(a => a.text !== "")}})
        if (!newQuestion.answer.answers.some(a => a.correct)) {
          alert("Please provide at least one correct answer")
          return;
        }
        break;
      case QuestionType.TRUE_FALSE:
        break;
    }
    setQuestion(newQuestion);
    setEditing(false);
  }

  return (
    <div style={{ width: "100%", fontFamily: "Arial, sans-serif" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "10px",
        }}
      >
        <input
          id="question-name"
          className="input-control"
          placeholder="Question Title"
          value={newQuestion.title}
          onChange={e => setNewQuestion({...newQuestion, title: e.target.value})}
          style={{
            flexGrow: 1,
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}/>
        <select
          className="select-control"
          value={newQuestion.type}
          onChange={(e) => setNewQuestion({...newQuestion, type: parseInt(e.target.value)})}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            flexShrink: 0,
          }}>
          <option value={QuestionType.TRUE_FALSE}>True/False</option>
          <option value={QuestionType.MULTIPLE_CHOICE}>Multiple Choice</option>
          <option value={QuestionType.FILL_IN_THE_BLANK}>Fill in the blank</option>
        </select>
        <span
          className="fw-bold"
          style={{
            flexShrink: 0,
            padding: "0 5px",
          }}
        >
          pts:
        </span>
        <input
          className="input-control flex-end"
          type="number"
          placeholder="Points"
          value={newQuestion.pts}
          onChange={e => setNewQuestion({...newQuestion, pts: parseInt(e.target.value)})}
          style={{
            width: "100px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
      </div>
      <hr style={{ borderTop: "1px solid #ccc" }} />
      <div>{renderEditor()}</div>
      <div style={{ marginTop: "30px", textAlign: "left" }}>
        <button
          onClick={save}
          style={{
            padding: "10px 15px",
            marginRight: "10px",
            backgroundColor: "#f44336", 
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Update Question
        </button>
        <button
          onClick={() => setEditing(false)}
          style={{
            padding: "10px 15px",
            backgroundColor: "#D3D3D3", 
            color: "black",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default QuestionEditor;