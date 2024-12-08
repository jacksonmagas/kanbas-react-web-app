import React, { useState } from "react";
import TrueFalseQuestionEditor, { TrueFalseQuestion } from "./TrueFalseQuestionEditor";
import MultipleChoiceEditor, { MultipleChoiceQuestion } from "./MultipleChoiceEditor";
import FillInTheBlankEditor, { FillInTheBlankQuestion } from "./FillInTheBlankEditor";

export enum QuestionType {
  // other parts of the code rely on this being int based
  TRUE_FALSE = 0,
  MULTIPLE_CHOICE = 1,
  FILL_IN_THE_BLANK = 2
}

export interface QuizQuestion {
  title: string,
  pts: number,
  type: QuestionType,
  question: TrueFalseQuestion | MultipleChoiceQuestion | FillInTheBlankQuestion
}

const QuestionEditor: React.FC = () => {
  const [questionType, setQuestionType] = useState(QuestionType.TRUE_FALSE);

  const renderEditor = (): JSX.Element => {
    switch (questionType) {
      case QuestionType.TRUE_FALSE:
        return <TrueFalseQuestionEditor />;
      case QuestionType.MULTIPLE_CHOICE:
        return <MultipleChoiceEditor />;
      case QuestionType.FILL_IN_THE_BLANK:
        return <FillInTheBlankEditor />;
      default:
        return <div>Please select a question type.</div>;
    }
  };

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
          style={{
            flexGrow: 1,
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <select
          className="select-control"
          value={questionType}
          onChange={(e) => setQuestionType(parseInt(e.target.value))}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            flexShrink: 0,
          }}
        >
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
    </div>
  );
};

export default QuestionEditor;